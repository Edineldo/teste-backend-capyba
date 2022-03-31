const { Sequelize, Op } = require('sequelize');

const ModelInfos = require('../models/ModelInfos');
const CarsModel = require('../models/Cars');
const RentSchedulesModel = require('../models/Rent_schedules');

const getCars = async (type, restrict, search, page, perPage, ordering) => {
    const whereConditions = brandModelFilter(search) || {};
    typeFilter(type, whereConditions);
    restrictFilter(restrict, whereConditions);
    const attributes = ['id', 'model', 'type', 'brand', 'fee']
    restrict ? attributes.push('restrict') : false;

    return ModelInfos.findAndCountAll({
        where: whereConditions,
        attributes: attributes,
        offset: ((page - 1) * perPage),
        limit: perPage,
        order: Sequelize.col(ordering || 'id'),
    });
}

const brandModelFilter = (search) => {
    if(search){
        return {
            [Op.or]: [
                { model:  { [Op.substring]: search } },
                { brand: { [Op.substring]: search } },
            ]
        }
    }
}

const typeFilter = (type, conditions) => {
    if(type){
        const typesArray = type.split(',');
        conditions.type = { [Op.in]: typesArray };
    }
}

const restrictFilter = (restrict, conditions) => {
    if(!restrict){
        conditions.restrict = { [Op.eq]: false };
    }
}

const getAvailableCarsByModel = async (id) => ModelInfos.findOne({
    where:{id},
    attributes: ['id', 'model', 'type', 'brand', 'fee'],
    include: 
    [
        {
            model: CarsModel,
            as: 'car_instance',
            where: {already_scheduled: false},
            attributes: ['id', 'model_id', 'km', 'already_scheduled'],
        },
    ],
})

const createRentSchedule = async (scheduleBody) => RentSchedulesModel.create(scheduleBody);

const updateScheduledCar = async (car_id, scheduled) => CarsModel.update({
    already_scheduled: scheduled,
}, {
    where: {id: car_id},
    returning: true,
}) 

const getMySchedules = async (user_id) => RentSchedulesModel.findAndCountAll({
    where: {
        user_id,
    },
});

const getScheduleById = async (id) => RentSchedulesModel.findByPk(id);

module.exports = {
    getCars,
    getAvailableCarsByModel,
    createRentSchedule,
    updateScheduledCar,
    getMySchedules,
    getScheduleById,
};