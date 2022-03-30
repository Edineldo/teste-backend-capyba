const UserService = require('../services/users.service');

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

async function validateUserBody(req, res, next) {
    const { 
        name, email, password, photo,
    } = req.body;

    const registerBody = {};

    if(!name || String(name).length < 1) return res.status(400).json({ message: "Insira um nome!" });
    registerBody.name = name;
    if(!password || String(password).length < 1) return res.status(400).json({ message: "Insira um password!" });
    registerBody.password = password;
    
    if(!email || String(email).length < 1) return res.status(400).json({ message: "Insira um email!" });
    if(!validateEmail(email)) return res.status(400).json({ message: "Email passado inválido, insira um válido!" });
    const emailAlreadyUsed = await UserService.getUserByEmail(email);
    if (emailAlreadyUsed) return res.status(400).json({ message: "Email já utilizado, inserir um novo!" });
    registerBody.email = email;
    registerBody.photo = photo;

    res.locals.data = { registerBody };

    return next();
}

module.exports = {
    validateUserBody,
}