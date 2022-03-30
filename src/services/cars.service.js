const CarsRepository = require('../repositories/cars.repository');


const getCars = async(type, restricted, search = "", page = 0, perPage = 15) => {
    console.log(search);
    console.log(perPage);
    console.log(page);
    return  await CarsRepository.getCars(type, restricted, search, page, perPage);
}

const getAvailableCarsByModel = async (model_id) =>{
    return await CarsRepository.getAvailableCarsByModel(model_id);
}

const createRentSchedule = async(scheduleBody) =>{
    return await CarsRepository.createRentSchedule(scheduleBody);
}

const updateScheduledCar = async(car_id, scheduled) => {
    return await CarsRepository.updateScheduledCar(car_id, scheduled);
}
module.exports = {
    getCars,
    getAvailableCarsByModel,
    createRentSchedule,
    updateScheduledCar,
};