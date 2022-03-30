const { Model, DataTypes } = require('sequelize');

class Confirm_emails extends Model {
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
            code: {
                type: DataTypes.STRING,
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

module.exports = Confirm_emails;
