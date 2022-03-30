;const { Model, DataTypes } = require('sequelize');

class ModelInfos extends Model {
    static init(sequelize){
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            model: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            brand: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            fee: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            restrict: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
            },
        } , {
            sequelize,
            timestamps: true,
        });
    }
}

module.exports = ModelInfos;