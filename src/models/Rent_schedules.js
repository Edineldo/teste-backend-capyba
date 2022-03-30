const { Model, DataTypes } = require('sequelize');

class Rent_schedules extends Model {
    static init(sequelize){
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'Users',
                  key: 'id',
                },    
            },
            car_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'Cars',
                  key: 'id',
                },
            },
            initial_price: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            retrieve_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            devolution_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            deletedAt: {
                type: DataTypes.DATE,
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
        });
    }
}

module.exports = Rent_schedules;