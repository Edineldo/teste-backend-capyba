const AuthService = require('../services/auth.service');

async function sendConfirmationEmail(req, res){
    try{
        const { user_id } = res.locals;

        const isUserEmailUnconfirmed = await AuthService.verifyUserUnconfirmedEmail(user_id);
        if(!isUserEmailUnconfirmed) return res.status(401).json({ message: "O email do usuário já foi confirmado" });
        const email = isUserEmailUnconfirmed.email;
        const alreadySentEmail = await AuthService.verifyAlreadySentConfirmationEmail(user_id);
        if(alreadySentEmail) await alreadySentEmail.destroy();

        const createConfirmEmail = await AuthService.createConfirmEmail(user_id, email);
        if (!createConfirmEmail) return res.status(400).json({ message: "Não foi possível criar a verificação de email" })
        return res.status(201).json(createConfirmEmail);

    }catch(e){
        res.status(500).json({ message: "Erro desconhecido ao enviar email de confirmação" });
    }
}

async function validateConfirmationCode(req, res){
    try{
        const { code } = req.body;
        const { user_id } = res.locals;

        const isUserEmailUnconfirmed = await AuthService.verifyUserUnconfirmedEmail(user_id);
        if (!isUserEmailUnconfirmed) return res.status(401).json({ message: "O usuário não tem confirmação de email pendente" });

        const getUserConfirmationMail = await AuthService.verifyAlreadySentConfirmationEmail(user_id); 
        if (!getUserConfirmationMail) return res.status(404).json({ message: "Não foi possível localizar o código de confirmação do usuário" });

        if (!(code == getUserConfirmationMail.code)) return res.status(401),json({ message: "Código inserido foi inválido para o usuário" });
        isUserEmailUnconfirmed.email_confirmed = true;
        await isUserEmailUnconfirmed.save();
        await getUserConfirmationMail.destroy();
        return res.status(201).json({ message: "Email confirmado com sucesso" });
    }catch(e){
        res.status(500).json({ message: "Erro desconhecido ao confirmar código" });
    }
}

module.exports = {
    sendConfirmationEmail,
    validateConfirmationCode,
}