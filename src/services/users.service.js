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


// const createHashPassword = async (body) => {
//     const hashPassword = await bcrypt.hash(registerBody.password, 10 , (err, hash) => {
//         if(err){
//             return null;
//         }
//         return hash;
//     });
//     body.password = hashPassword;
//     return body;
// }

const compareHashPassword = async (password, hash) => {
    return comparison = await bcrypt.compare(password, hash);
}

const registerUser = async (registerBody) => {
    //const bodyWithHashPassword = await createHashPassword(registerBody);
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