const {Router} = require("express")
const {RegisterTrays, GetAllTrays, GetMonths, GetTrays, GeneratePDF} = require("../controllers/blueberry")
const {check} = require("express-validator")
const {validate_fields} = require("../middlewars/validate-fields")

const router = Router()

router.post("/new",[
    check("trays","El tipo de bandeja no puede estar vacía.").notEmpty(),
    check("amount","La cantidad de bandejas debe ser un número.").isDecimal(),
    check("user_id","El id del usuario no puede ser vacío.").notEmpty(),
    check("date","Debe ingresar la fecha en el formato correcto (DD/MM/YYYY).").matches(/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[/\\/](19|20)\d{2}$/),
    validate_fields
], RegisterTrays)

router.post("/get-trays", GetAllTrays)

router.get("/get-trays", GetTrays)

router.post("/get-months", GetMonths)

router.post("/pdf", GeneratePDF)

module.exports = router
