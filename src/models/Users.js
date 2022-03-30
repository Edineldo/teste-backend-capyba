const { Model, DataTypes } = require('sequelize');

class Users extends Model {
    static init(sequelize){
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email_confirmed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            photo: {
                type: DataTypes.STRING,
            },
            createdAt: {
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
            },
        }, {
            sequelize,
            timestamps: true,
        });
    }
}

module.exports = Users;