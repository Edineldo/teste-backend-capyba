const CarsService = require('../services/cars.service');
const UsersService = require('../services/users.service');

async function getRentableModels(req, res){
    try{
        const {
            search, type, page, perPage, ordering,
        } = req.query;
        const { user_id } = res.locals;

        const isEmailconfirmed = await UsersService.getUserById(user_id);
        const restrict = isEmailconfirmed.email_confirmed;

        let querySearch;
        if (search) querySearch = search.charAt(0).toUpperCase() + search.slice(1)

        const rentCars = await CarsService.getCars(type, restrict, querySearch, page, perPage, ordering);
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

        const availableRentable = await CarsService.getAvailableCarsByModel(model_id);
        if(!availableRentable) return res.status(404).json({ message: "Não Foi possível localizar o modelo desejado" });
        if(!availableRentable.car_instance.length) return res.status(400).json({ message: "Não existem carros do modelo desejado, disponíveis" });

        const car_rented = availableRentable.car_instance[0];
        const scheduleBody = {
            user_id: user_id,
            car_id: car_rented.id,
            initial_price: availableRentable.fee,
            retrieve_date: new Date(retrieve_date),
            devolution_date: new Date(devolution_date),
        }

        const schedule = await CarsService.createRentSchedule(scheduleBody);
        if(!schedule) return res.status(400).json({ message: "Não foi possível criar o agendamento de aluguel" });
        await CarsService.updateScheduledCar(car_rented.id, true);

        return res.status(201).json({message: "Agendamento de aluguel efetuado com"});
    }catch(e){
        res.status(500).json({ message: "Algo deu errado ao cria reserva de aluguel", e })
    }
}

async function getMySchedules(req, res){
    try{
        const { user_id } = res.locals;

        const mySchedules = await CarsService.getMySchedules(user_id);
        if (mySchedules.count === 0) return res.status(204).json({ message: "O usuário não tem aluguéis agendados"});

        return res.status(201).json(mySchedules);
    }catch(e){
        res.status(500).json({ message: "Algo deu errado ao cria reserva de aluguel", e })
    }
}

async function cancelSchedule(req, res){
    try{
        const { user_id } = res.locals;
        const { schedule_id } = req.body;

        const mySchedules = await CarsService.getMySchedules(user_id);
        if (mySchedules.count === 0) return res.status(404).json({ message: "O usuário não tem aluguéis agendados"});
        const getSchedule = await CarsService.getScheduleById(schedule_id);

        const belongsToUser = CarsService.isUserSchedule(mySchedules.rows, schedule_id);
        if (!belongsToUser) return res.status(400).json({ message: "O id de agendamento não percente ao usuário" })

        const { car_id } = getSchedule;
        await getSchedule.destroy();
        await CarsService.updateScheduledCar(car_id, false);
        return res.status(201).json({ message: "Agendamento cancelado com sucesso" });
    }catch(e){
        res.status(500).json({ message: "Algo deu errado ao cancelar uma reserva de aluguel" });
    }
}

module.exports = {
    getRentableModels,
    scheduleRent,
    getMySchedules,
    cancelSchedule,
}