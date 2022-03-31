
const UsersModel = require('../models/Users');

const getUserByEmail = async (email) => UsersModel.findOne({
  where: { 
    email,
  },
});

const getUserById = async(id) => UsersModel.findOne({
  where: {
    id,
  },
});

const registerUser = async (registerBody) => UsersModel.create(
    registerBody,
);

const updatePassword = async(id, new_password) => UsersModel.update(
  {
    password: new_password,
  }, {
    where: { id: id },
    returning: true,
  },
);

const updateRegister = async (updateBody) => UsersModel.update({
  nome: updateBody.name,
  email: updateBody.email,
  photo: updateBody.photo,

} , {
  where: { id: updateBody.id },
  returning: true,
});

const verifyUserUnconfirmedEmail = async (user_id) => UsersModel.findOne({
  where: {
    id: user_id,
    email_confirmed: false,
  },
});

module.exports = {
    getUserByEmail,
    getUserById,
    registerUser,
    updatePassword,
    updateRegister,
    verifyUserUnconfirmedEmail
}