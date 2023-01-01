const jwt = require("jsonwebtoken")
const {request, response} = require("express")

const validate_jwt = (req=request, res=response, next) => {
    const token = req.header("x-token")

    if (!token) {
        res.status(401).json({msg: "No existe token en la petición."})
    }

    try {
        const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        req.id = payload.uid
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({msg: "Token no válido."})
    }
}

module.exports = {
    validate_jwt
}