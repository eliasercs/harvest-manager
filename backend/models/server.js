const express = require("express")
const cors = require("cors")
const path = require("path")

const {connect_db} = require("../database/config")

require("dotenv").config()

class Server {

    constructor() {
        this.app = express()
        this.connect_db()
        this.midlewares()
        this.routes()
    }

    async connect_db() {
        await connect_db()
    }

    routes() {
        this.app.use("/api/auth", require("../routes/auth"))
        this.app.use("/api/users", require("../routes/user"))
        this.app.use("/api/blueberry", require("../routes/blueberry"))

        this.app.get("*", (req, res) => {
            res.sendFile(path.normalize(__dirname + '/../public/404.html'))
        })
    }

    midlewares() {
        this.app.use(cors())
        // Lectura y parseo del body
        this.app.use(express.json())
        // Servir contenido estático
        this.app.use(express.static("public"))
    }

    listen() {
        this.app.listen(process.env.PORT, () => console.log(`Escuchando en el puerto ${process.env.PORT}`))
    }

}

module.exports = Server