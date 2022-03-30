const CarsService = require('../services/cars.service');

async function getRentableModels(req, res){
    try{
        const {
            search, type, restricted, page, perPage,
        } = req.query;
        const { user_id } = res.locals;
        console.log("teste");
        //console.log(search);
        let querySearch;
        if (search) querySearch = search.charAt(0).toUpperCase() + search.slice(1)



        const rentCars = await CarsService.getCars(type, restricted, search, page, perPage);
        if (!rentCars.count === 0) return res.status(400).json({ message: "Nenhum modelo encontrado" });
        return res.status(201).json(rentCars);
    }catch(e){
        res.status(500).json({ message: "Erro desconhecido ao listar carros", e });

    }
}

async function scheduleRent(req, res){
    try{
        const { user_id } = res.locals;
        const { model_id, retrieve_date, devolution_date } = req.body;

        console.log(model_id);
        const availableRentable = await CarsService.getAvailableCarsByModel(model_id);
        if(!availableRentable) return res.status(400).json({ message: "Não Foi possível localizar o modelo desejado" });
        if(!availableRentable.car_instance.length) return res.status(400).json({ message: "Não existem carros do modelo desejado, disponíveis" });

        const car_rented = availableRentable.car_instance[0];
        
        const scheduleBody = {
            user_id: user_id,
            car_id: car_rented.id,
            initial_price: availableRentable.fee,
            retrieve_date: new Date(retrieve_date),
            devolution_date: new Date(devolution_date),
        }
        const schedule = await createRentSchedule(scheduleBody);
        if(!schedule) return res.status(400).json({ message: "Não foi possível criar o agendamento de aluguel" });
        
        await CarsService.updateScheduledCar(car_rented.id, true);

        return res.status(201).json(availableRentable);
    }catch(e){
        res.status(500).json({ message: "Algo deu errado ao cria reserva de aluguel", e })
    }
}

module.exports = {
    getRentableModels,
    scheduleRent,
}