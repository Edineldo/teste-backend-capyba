const { Model, DataTypes } = require('sequelize');

class Logged_users extends Model {
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
              token: {
                type: DataTypes.TEXT,
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

module.exports = Logged_users;