const {Schema, model} = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")

const BlueberrySchema = Schema({
    user_id: {type: String, required: [true, "El usuario es requerido."]},
    date: {type: String, required: [true, "La fecha es obligatorio."]},
    amount: {type: Number, required: [true, "La cantidad de bandejas es requerida."]},
    type: {type: String, required: [true, "Debe definir el tipo de bandeja."]},
    period: {type: String, required: [true, "Mes y año es requerido."]}
})

BlueberrySchema.plugin(mongoosePaginate)

module.exports = model('Blueberry', BlueberrySchema)