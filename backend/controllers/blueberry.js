const {request, response} = require("express")
const { paginateConfig } = require("../database/paginate")
const Blueberry = require("../models/blueberry")
const PdfkitConstruct = require('pdfkit-construct');
const User = require("../models/user")

const translate = {
    "1": "Enero",
    "2": "Febrero",
    "3": "Marzo",
    "4": "Abril",
    "5": "Mayo",
    "6": "Junio",
    "7": "Julio",
    "8": "Agosto",
    "9": "Septiembre",
    "10": "Octubre",
    "11": "Noviembre",
    "12": "Diciembre"
}

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
    const {query = {}} = req
    const {limit, page} = paginateConfig(query)

    try {
        const {user_id, m, y} = query

        if (!user_id & !m & !y) {
            return res.status(400).json({user_id: "required", m: "required", y: "required"})
        }

        const month = m+"/"+y
        const data = await Blueberry.paginate({user_id, period: month}, {limit, page})
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}

const GetAllTrays = async (req = request, res = response) => {
    const {user_id, month} = req.body
    const trays = await Blueberry.find({user_id, period: month})
    return res.status(200).json(trays)
}

const GetMonths = async (req = request, res = response) => {
    const {user_id} = req.body
    var month = []
    var number = []
    const trays = await Blueberry.find({user_id})
    trays.forEach((element) => {
        var m = element["period"].split("/")
        var t = translate[m[0]] + " " + m[1]
        if (!month.includes(t)) {
            month.push(t)
        }
        if (!number.includes(element["period"])) {
            number.push(element["period"])
        }
    })
    return res.status(200).json({month, number})
}

const GeneratePDF = async (req = request, res = response) => {

    console.log(req.headers)

    const image = req.files.file.tempFilePath
    
    const user_id = req.body["user_id"]
    const period = req.body["period"]

    const data = await Blueberry.find({user_id, period})
    const user = await User.findById(user_id)

    const trays = []
    data.map((value, key) => {
        const {date, amount, type} = value
        trays.push({id: key, date, amount, type})
    })

    console.log(user)

    const doc = new PdfkitConstruct({
        size: "A4",
        margins: {top: 40, left: 10, right: 10, bottom: 0},
        bufferPages: true
    })
    const fecha = new Date()

    let filename = "prueba.pdf"

    let reporte_generado = "Reporte generado: " + fecha.toLocaleDateString()


    doc.image(image, 100, 60, {fit: [400,400], align: 'center'})
    doc.font('Times-Roman')
    doc.fontSize(8)
    doc.text(reporte_generado, 40, 40, {align: 'left'})
    doc.fontSize(12)
    doc.text("Información del usuario", 0, 280, {align: 'center'})
    doc.fontSize(10)
    doc.text("Nombre completo: "+ user.name + " " + user.lastname, 40, 300, {align: 'left'})
    doc.text("Correo electrónico: "+ user.email, 40, 320, {align: "left"})
    doc.text("Faena: Cosecha", 40, 340, {align: "left"})
    doc.text("Tipo de trabajador: Cosechero", 40, 360, {align: "left"})

    doc.fontSize(12)
    doc.text("Información de Cosecha", 0, 380, {align: "center"})

    doc.fontSize(10)
    doc.text("Días trabajados: "+data.length, 40, 400, {align: "left"})
    doc.text("Periodo: "+data[0].period, 40,420, {align: "left"})
    doc.text("Día de inicio: "+data[0].date, 40, 440, {align: "left"})
    doc.text("Día de término: "+data[data.length-1].date, 40, 460, {align: "left"})

    doc.fillColor('red')
    doc.text("* En la siguiente página, se encuentra detallado el listado de bandejas", 40, 750, {align: "left"})

    doc.addPage()

    doc.setDocumentHeader({
        height: "2%"
    }, () => {
        doc.font("Times-Roman")
        doc.fontSize(12)
        doc.text("Listado de bandejas", {align: "center"})
    })

    doc.addTable([
        {key: "id", label: "ID"},
        {key: "date", label: "Fecha"},
        {key: "type", label: "Tipo de bandeja"},
        {key: "amount", label: "Cantidad de bandejas"}
    ], trays, {
        border: {size: 0.1, color: "#000"},
        cellsMaxWidth: 100,
        cellsAlign: "left",
        width: "fill_body",
        striped: false,
        cellsPadding: 10,
        headAlign: "left",
        headBackground: "#000",
        headColor: "#fff",
        marginLeft: 100,
        marginRight: 100,
        marginTop: 0,
        marginBottom: 0,
        headFont: "Times-Roman",
        cellsFont: "Times-Roman"
    })

    doc.info = {
        Title: "Reporte de Rendimiento en Cosecha",
        Author: user.name + " " + user.lastname
    }

    doc.render()

    doc.setPageNumbers((p, count) => `Página ${p} de ${count}`, position = "top")

    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Access-Control-Allow-Origin', "https://harvestmanager.onrender.com")
    res.setHeader('Access-Control-Allow-Methods', 'POST')

    doc.pipe(res)
    doc.end()

}

module.exports = {
    RegisterTrays,
    GetTrays,
    GetAllTrays,
    GetMonths,
    GeneratePDF
}