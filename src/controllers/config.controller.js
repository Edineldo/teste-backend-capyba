const { user } = require('pg/lib/defaults');
const UserService = require('../services/users.service');

async function updatePassword(req, res){
    try{
        const { user_id } = res.locals;
        const { currentPassword, newPassword } = req.body;

        const verifyUser = await UserService.getUserById(user_id);
        if(!verifyUser) return res.status(404).json({ message: "Não foi possível localizar o usuário" });
        if (verifyUser.password !== currentPassword) return res.status(401).json({ message: "Senha atual incorreta" });
        if (verifyUser.password === newPassword) return res.status(401).json({ message: "A nova senha deve ser diferente da atual" });
        
        const update = await UserService.updatePassword(user_id, newPassword);
        if (!update) return res.json(400).json({ message: "Erro na atualização da senha" })
        return res.status(201).json({ message: "Senha alterada com sucesso" });

    }catch(e){
        return res.status(500).json({ message: "Erro desconhecido ao atualizar a senha" });
    }
}

async function updateRegister(req, res){
    try{
        const { user_id } = res.locals;
        const { newName, newEmail, newPhoto } = req.body;

        const verifyUser = await UserService.getUserById(user_id);
        if (!verifyUser) return res.status(404).json({ message: "Não foi possível localizar o usuário" });

        const body = {
            id: user_id,
            name: newName,
            email: newEmail,
            photo: newPhoto,
        };

        const update = await UserService.updateRegister(body);
        if (!update) return res.json(400).json({ message: "Erro na atualização do cadastro, tente novamente!" })
        return res.status(201).json({ message: "Cadastro alterado com sucesso" });
    }catch(e){
        return res.status(500).json({ message: "Erro desconhecido ao atualizar o cadastro" });
    }
}

module.exports = {
    updatePassword,
    updateRegister,
}