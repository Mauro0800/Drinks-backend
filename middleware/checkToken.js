const createError = require('http-errors');
const { verify } = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req,res,next) => {

    try {

        if(!req.headers.authorization){
            throw createError(401, "Se requiere un token")
        }

        const token = req.headers.authorization;
        const decoded = verify(token, process.env.JWT_SECRET)
        
        req.user = await User.findById(decoded.user.id).select("-password -token -checked -createdAt -updatedAt -__v").populate("favorites","drink")
        
        next()
        
    } catch (error) {

        let message;

        switch (error.message) {
            case "jwt malformed":
                message = "El token esta corrupto"
                break;
            case "jwt expired":
                message = "El token ha expirado"
                break;
            case "invalid token":
                message = "Token invalido"
                break;
            case "invalid signature":
                message = "Firma invalida"
                break;
            default:
                message = error.message
                break;
        }

        return res.status(error.status || 500).json({
            ok : false,
            message : message || "Upss, hubo un problema"
        })
    }

}