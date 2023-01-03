const {request, response} = require("express")
const Blueberry = require("../models/blueberry")

const RegisterTrays = async (req = request, res = response) => {
    const {trays, amount, date, user_id} = req.body

    var d = date.split("/")
    var month = d[1]+"/"+d[2]
    
    try {
        // Verificar si existe una bandeja registrada para el día de hoy
        const isset_tray = await Blueberry.findOne({user_id, date})
        if (!isset_tray) {
            const tray = new Blueberry({user_id, date, amount, type: trays, period: month})
            await tray.save()
            return res.status(200).json(tray)
        } else {
            isset_tray.amount = amount
            isset_tray.type = trays
            isset_tray.save()
            return res.status(200).json(isset_tray)
        }
    } catch (error) {
        console.log(error)
    }    
}

module.exports = {
    RegisterTrays
}