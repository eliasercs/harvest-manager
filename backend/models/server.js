const express = require("express")
const cors = require("cors")
const path = require("path")

class Server {

    constructor() {
        this.app = express()
        this.midlewares()
        this.routes()
    }

    routes() {
        this.app.use("/api/users", require("../routes/user"))

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
        this.app.listen(8000, () => console.log('Escuchando en el puerto 8000'))
    }

}

module.exports = Server