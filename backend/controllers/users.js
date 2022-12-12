const {response, request} = require("express")
const bcrypt = require("bcryptjs")
const User = require("../models/user")

const usersPost = async (req = request, res = response) => {    
    const {name, lastname, email, password} = req.body

    const user = new User({
        name,
        lastname,
        email,
        password
    })

    // Verificar la existencia de un correo
    const isset_email = await User.findOne({email})
    if (isset_email) {
        return res.status(400).json({msg: "El correo ingresado ya existe."})
    }
    // Crear el hash de la contraseña
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    await user.save()

    res.json({
        user
    })
}

module.exports = {
    usersPost
}