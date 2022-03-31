const UserRepository = require('../repositories/users.reporsitory');
const bcrypt = require('bcrypt');

const getUserByEmail = async (email) => {
    return await UserRepository.getUserByEmail(email);
}

const getUserById = async(id) => {
    return await UserRepository.getUserById(id);
}

const updatePassword = async (id, new_password) => {
    return await UserRepository.updatePassword(id, new_password);
}

const updateRegister = async(updateBody) => {
    return await UserRepository.updateRegister(updateBody);
}

const compareHashPassword = async (password, hash) => {
    return comparison = await bcrypt.compare(password, hash);
}

const registerUser = async (registerBody) => {
    return await UserRepository.registerUser(registerBody);
}
module.exports = {
    getUserByEmail,
    getUserById,
    registerUser,
    compareHashPassword,
    updatePassword,
    updateRegister,
}