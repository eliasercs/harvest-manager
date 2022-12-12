const {Router} = require("express")
const {check} = require("express-validator")
const { usersPost } = require("../controllers/users")
const {validate_fields} = require("../middlewars/validate-fields")

const router = Router()

router.post("/",[
    check('name', "El nombre es obligatorio.").not().isEmpty(),
    check('lastname', "El apellido es obligatorio.").not().isEmpty(),
    check("email", "El correo ingresado no es válido.").isEmail(),
    check('password', 'La contraseña debe contener 8 carácteres como mínimo.').isLength({min: 8}),
    validate_fields
], usersPost)

module.exports = router