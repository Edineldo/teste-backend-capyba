const { Op } = require('sequelize');

const LoggedUsersModel = require('../models/Logged_users');
const UsersModel = require('../models/Users');
const ConfirEmailModel = require('../models/Confirm_email');

const verifyLoggedId = async(user_id) => LoggedUsersModel.findOne({
    where: {
        user_id,
    },
    include: [{
        model: UsersModel,
        as: 'user',
        required: true,
    }],
});

const createLoggedUser = async (user_id, token) => LoggedUsersModel.create({
    user_id,
    token,
});

const deleteLoggedUser = async (id) => LoggedUsersModel.destroy({
    where: {
        id,
    }
})

const verifyAlreadySentConfirmationEmail = (user_id) => ConfirEmailModel.findOne({
    where: {
        user_id,
    },
});

const createConfirmEmail = async(user_id, code) => ConfirEmailModel.create({
    user_id: user_id,
    code: code,
});

module.exports = {
    verifyLoggedId,
    createLoggedUser,
    deleteLoggedUser,
    verifyAlreadySentConfirmationEmail,
    createConfirmEmail,
};