const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Users = require('./Users');
const Logged_users = require('./Logged_users');
const ModelInfos = require('./ModelInfos');
const Cars = require('./Cars');
const Rent_schedules = require('./Rent_schedules');
const Confirm_emails = require('./Confirm_email');

const connection = new Sequelize(dbConfig);

Users.init(connection);
Logged_users.init(connection);
ModelInfos.init(connection);
Cars.init(connection);
Rent_schedules.init(connection);
Confirm_emails.init(connection);


Logged_users.belongsTo(Users, {
  foreignKey: 'user_id',
  targetKey: 'id',
  as: 'user', 
});

Confirm_emails.belongsTo(Users, {
  foreignKey: 'user_id',
  targetKey: 'id',
  as: 'user',
});

ModelInfos.hasMany(Cars, {
  foreignKey: 'model_id',
  targetKey: 'id',
  as: 'car_instance',
});

Rent_schedules.belongsTo(Users, {
  foreignKey: 'user_id',
  targetKey: 'id',
  as: 'renting',
});

Rent_schedules.belongsTo(Cars, {
  foreignKey: 'car_id',
  targetKey: 'id',
  as: 'rented',
})

module.exports = connection;