const {Router} = require("express")
const {check} = require("express-validator")
const { usersPost } = require("../controllers/users")
const {validate_fields} = require("../middlewars/validate-fields")

const router = Router()

router.post("/",[
    check('name', "El nombre es obligatorio.").notEmpty(),
    check('lastname', "El apellido es obligatorio.").notEmpty(),
    check("email", "El correo ingresado es obligatorio.").isEmail(),
    check('password', 'La contraseña debe contener 8 carácteres como mínimo.').isLength({min: 8}),
    validate_fields
], usersPost)

module.exports = router