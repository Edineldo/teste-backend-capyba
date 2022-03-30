const AuthService = require('../services/auth.service');

async function validateUserToken(req, res, next) {
  const token = req.headers.authorization;
  
  const decodedToken = await AuthService.decodeJwtToken(token);
  if (!decodedToken) res.status(401).json({ message: "Token inválido!" });
  const validateToken = await AuthService.verifyToken(decodedToken.user_id, token);
  if (!validateToken.valid) return res.status(403).json({ message: validateToken.message });

  res.locals.user_id = decodedToken.user_id;

  return next();
}

module.exports = {
    validateUserToken,
}