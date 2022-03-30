const AuthRepository = require('../repositories/auth.repository');
const UserRepository = require('../repositories/users.reporsitory');

const nodemailer = require('nodemailer'); 
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const senderEmail = process.env.NODEMAILER_USER;
const senderPassword = process.env.NODEMAILER_PASS;

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: senderEmail,
        pass: senderPassword,
    },
});



const sendEmail = async (reciever, code) => {
    const options = {
        from: senderEmail,
        to: reciever,
        subject: "Confirmation emaul from register to Teste Capyba",
        text: `Your confirmation code: ${code}`,
    };

    let sent = await transporter.sendMail(options);

    return sent.accepted.length > 0;
}

const generateConfirmationCode = () => {
    return Math.random().toString(26).substring(5);
}

const createConfirmEmail = async (user_id, user_email) => {
    const confirmationCode = generateConfirmationCode();

    const hasSent = await sendEmail(user_email, confirmationCode);

    if (!hasSent) return null;
    
    return await AuthRepository.createConfirmEmail(user_id, confirmationCode);
}

const verifyLoggedId = async (user_id) => {
    return await AuthRepository.verifyLoggedId(user_id);
}

const generateJwtToken = async (user_id, email) => {
    const payload = { user_id, email };
    return jwt.sign(payload, secret);
}

const decodeJwtToken = async (token) => {
    var validToken = false; 

    await jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return false;
        }
        validToken = decoded;
        return true;
    });
    return validToken;
}

const verifyToken = async (user_id, token) => {
  const verifyUserSession = await AuthRepository.verifyLoggedId(user_id);
  if (!verifyUserSession) return { valid: false, message: "Não foi possível localizar a sessão do usuário" };
  if(token !== String(verifyUserSession.token)) return { valid: false, message: "O token não pertence ao usuário" };
  return { valid: true, user: verifyUserSession };
}

const createLoggedUser = async (user_id, email) => {
    const token = await generateJwtToken(user_id, email);
    return await AuthRepository.createLoggedUser(user_id, String(token));
}

const deleteLoggedUser = async(id) => {
    return await AuthRepository.deleteLoggedUser(id);
}

const verifyUserUnconfirmedEmail = async (user_id) => {
    return await UserRepository.verifyUserUnconfirmedEmail(user_id);
}
const verifyAlreadySentConfirmationEmail = async (user_id) =>{
    return await AuthRepository.verifyAlreadySentConfirmationEmail(user_id);
}

module.exports = {
    verifyLoggedId,
    createLoggedUser,
    verifyToken,
    decodeJwtToken,
    deleteLoggedUser,
    verifyAlreadySentConfirmationEmail,
    verifyUserUnconfirmedEmail,
    createConfirmEmail,
};