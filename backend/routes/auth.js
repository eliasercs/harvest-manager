const {Router} = require("express")
const {check} = require("express-validator")
const {LoginController} = require("../controllers/auth")
const {validate_fields} = require("../middlewars/validate-fields")

const router = Router()

router.post("/login", [
    check("email", "El correo electrónico es obligatorio.").isEmail(),
    check("password", "La contraseña es requerida.").notEmpty(),
    validate_fields
], LoginController)

module.exports = router