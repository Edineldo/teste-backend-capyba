const { Op } = require('sequelize');

const ModelInfos = require('../models/ModelInfos');
const CarsModel = require('../models/Cars');

const getCars = async (type = "sport", restrict = false, search = "", page = 0, perPage = 15) => ModelInfos.findAndCountAll({
    where: {
        [Op.and]: [
            {
                [Op.or]: [
                    { model:  { [Op.substring]: search } },
                    { brand: { [Op.substring]: search }},
                ]
            },
            { type: { [Op.substring] : type } },
            { 
                [Op.or]: [
                    {restrict: { [Op.not]: restrict }},
                    {restrict: { [Op.eq]: restrict }},
                ]
             }
        ]
    },
    include: [
        {
            model: CarsModel,
            as: 'car_instance',
        },
    ],
    offset: page * perPage,
    limit: perPage,
});

module.exports = {
    getCars,
};