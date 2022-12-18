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
        return res.status(400).json({errors: [{msg: "El correo ingresado ya existe.", param: 'email'}]})
    } else {
        // Crear el hash de la contraseña
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        await user.save()

        return res.status(200).send(user)
    }
}

module.exports = {
    usersPost
}