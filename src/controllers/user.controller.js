const UserService = require('../services/users.service');
const AuthSetvice = require('../services/auth.service');

async function register(req, res){
    try{
        const { registerBody } = res.locals.data;

        const register = await UserService.registerUser(registerBody);
        if (!register) return res.status(400).json({ message: "Erro ao cadastrar usuário, tente novamente!" });

        return res.status(201).json({ message: `Usuário de email: ${register.email} registrado com sucesso!` });
        
    }catch(e){
        return res.status(500).json({ message: "Erro desconhecido cadastrar usuário." });
    }
}

async function login(req, res){
    try{
        const { email, password } = req.body;

        const existsEmail = await UserService.getUserByEmail(email);
        if (!existsEmail) return res.status(401).json({ message: "Não foi possivel autenticar o email" });
        console.log(password);

        //const passwordMatches = await UserService.compareHashPassword(password, existsEmail.password);
        const passwordMatches = existsEmail.password === password;
        if (!passwordMatches) return res.status(401).json({ message: "Não foi possível autenticar a senha" });
        
        const alreadyLogged = await AuthSetvice.verifyLoggedId(existsEmail.id);
        if (alreadyLogged) return res.status(400).json({ message: "Usuário já está logado" });
        
        const logInUser = await AuthSetvice.createLoggedUser(existsEmail.id, existsEmail.email);
        if (!logInUser) return res.status(400).json({ message: "Não foi possível iniciar a sessão" }); 

        return res.status(201).json({ message: "Usuário Logado com sucesso!", token: logInUser.token });
        
    }catch(e){
        return res.status(500).json({ message: "Erro desconhecido ao tentar login." });
    }
}

async function logout(req, res){
    try{
        const { user_id } = res.locals;

        const userSession = await AuthSetvice.verifyLoggedId(user_id);
        if (!userSession) return res.status(403).json({ message: "Não foi possivel localizar a sessão deste usuário" });

        await AuthSetvice.deleteLoggedUser(userSession.id);
        return res.status(201).json({ message: "Sessão encerrada com sucesso" });
    }catch(e){
        return res.status(500).json({ message: "Erro desconhecido ao tentar logout." })

    }
}

module.exports = {
    register,
    login,
    logout,
}