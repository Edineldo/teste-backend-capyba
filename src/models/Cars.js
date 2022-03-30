const { Model, DataTypes } = require('sequelize');

class Cars extends Model {
    static init(sequelize){
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            model_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'ModelIndfos',
                    key: 'id',
                },
            },
            km: {
                type: DataTypes.INTEGER,
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
        } ,{
            sequelize,
            timestamps: true,
        });
    }
}

module.exports = Cars;