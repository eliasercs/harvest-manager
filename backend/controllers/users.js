const {response, request} = require("express")

const usersGet = (req = request, res = response) => {
    res.json({
        "msg": "hola"
    })
}

const usersPost = (req = request, res = response) => {
    const body = req.body
    res.json(body)
}

module.exports = {
    usersGet,
    usersPost
}