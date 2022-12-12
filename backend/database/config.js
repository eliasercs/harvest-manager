const mongoose = require("mongoose")

const connect_db = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("Base de datos encendida")
    } catch (error) {
        console.log(error)
        throw new Error("Error al iniciar la base de datos.")
    }
}

module.exports = {
    connect_db
}