const CarsRepository = require('../repositories/cars.repository');


const getCars = async(type, restrict= false, search = "", page = 1, perPage = 15, ordering) => {
    return  await CarsRepository.getCars(type, restrict, search, page, perPage, ordering);
}

const getAvailableCarsByModel = async (model_id) =>{
    return await CarsRepository.getAvailableCarsByModel(model_id);
}

const createRentSchedule = async(scheduleBody) =>{
    return await CarsRepository.createRentSchedule(scheduleBody);
}

const updateScheduledCar = async(car_id, scheduled) => {
    console.log(car_id, scheduled);
    return await CarsRepository.updateScheduledCar(car_id, scheduled);
}

const getMySchedules = async (user_id) =>{
    return await CarsRepository.getMySchedules(user_id);
}
const getScheduleById = async (id) =>{
    return await CarsRepository.getScheduleById(id);
}

const isUserSchedule = (scheduleArray, schedule_id) =>{
    let belongs = false;
    scheduleArray.map(schedule => {
        if(parseInt(schedule.id) === schedule_id) belongs = true; 
    });
    return belongs;
}


module.exports = {
    getCars,
    getAvailableCarsByModel,
    createRentSchedule,
    updateScheduledCar,
    getMySchedules,
    getScheduleById,
    isUserSchedule,
};