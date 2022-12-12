const {Schema, model} = require("mongoose")

// Schema define el diseño de una colección
const UserSchema = Schema({
    name: {type: String},
    lastname: {type: String},
    email: {
        type: String,
        required: [true, "El correo electrónico es obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es requerida"],
    },
    image: {
        type: String
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

module.exports = model('User', UserSchema)