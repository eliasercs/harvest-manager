const {Router} = require("express")
const {check} = require("express-validator")
const {LoginController, Renew} = require("../controllers/auth")
const {validate_fields} = require("../middlewars/validate-fields")
const {validate_jwt} = require("../middlewars/validate-jwt")

const router = Router()

router.post("/login", [
    check("email", "El correo electrónico es obligatorio.").isEmail(),
    check("password", "La contraseña es requerida.").notEmpty(),
    validate_fields
], LoginController)

router.get("/renew", validate_jwt, Renew)

module.exports = router