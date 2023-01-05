const {request, response} = require("express")
const Blueberry = require("../models/blueberry")

const RegisterTrays = async (req = request, res = response) => {
    const {trays, amount, date, user_id} = req.body

    var d = date.split("/")
    var month = d[1]+"/"+d[2]

    if (trays === "default") {
        return res.status(400).json({errors: [{
            value: trays,
            msg: "Debe seleccionar un valor para el tipo de bandeja.",
            param: "trays"
        }]})
    }
    
    try {
        // Verificar si existe una bandeja registrada para el día de hoy
        const isset_tray = await Blueberry.findOne({user_id, date})
        if (!isset_tray) {
            const tray = new Blueberry({user_id, date, amount, type: trays, period: month})
            await tray.save()
            return res.status(200).json({...tray, message: "Cantidad de bandejas registradas satisfactoriamente."})
        } else {
            isset_tray.amount = amount
            isset_tray.type = trays
            isset_tray.save()
            return res.status(200).json({...isset_tray, message: "Cantidad de bandejas actualizadas satisfactoriamente."})
        }
    } catch (error) {
        console.log(error)
    }    
}

const GetTrays = async (req = request, res = response) => {
    const {user_id} = req.body
    const trays = await Blueberry.find({user_id})
    return res.status(200).json(trays)
}

module.exports = {
    RegisterTrays,
    GetTrays
}