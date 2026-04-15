const {verifyToken} = require("../utils/jwt")

async function authmiddleware(req, res, next){
    const authorization = req.headers.authorization

    if (!authorization) {
        return res.status(401).json({ message: "Token de autenticação não fornecido" })
    }

    const [type, token] = authorization.split(" ")

    if (type !== "Bearer" || !token) {
        return res.status(401).json({ message: "Token inválido" })
    }

    return res.json({token})
    next()
}

module.exports = authmiddleware;