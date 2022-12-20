const { request, response } = require("express")
const User = require("../models/user")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid }
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (error, token) => {
            if (error) {
                console.log(error)
                reject("No se pudo generar el JWT")
            } else {
                resolve(token)
            }
        })
    })
}

const LoginController = async (req=request, res=response) => {
    const {email, password} = req.body

    try {
        // Verificar si el email existe
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({msg: 'Usuario no encontrado.'})
        }
        if (!user.state) {
            return res.status(400).json({msg: 'Usuario eliminado o bloqueado indefinidamente.'})
        }
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({msg: 'Contraseña incorrecta.'})
        }
        // Generar un JSON Web Token
        const token = await generateJWT(user.id)
        return res.status(200).json({user, token})
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    LoginController
}