var User = require('./models/User.js')
var bcrypt = require('bcrypt-nodejs')
var jwt = require('jwt-simple')
var express = require('express')
var router = express.Router()

router.post('/register', (req, res) => {
    var userData = req.body

    var user = new User(userData)

    user.save((err, newUser) => {
        if (err)
            return res.status(500).send({ message: 'Error saving user' })

        createSendToken(res, newUser)
    })
})

router.post('/login', async (req, res) => {
    var loginData = req.body

    var user = await User.findOne({ email: loginData.email })

    if (!user)
        return res.status(401).send({ message: 'Email or Password invalid' })

    bcrypt.compare(loginData.pwd, user.pwd, (err, isMatch) => {
        if (!isMatch)
            return res.status(401).send({ message: 'Email or Password invalid' })

        createSendToken(res, user)
    })
})

function createSendToken(res, user) {
    var payload = { sub: user._id }

    var token = jwt.encode(payload, '123')

    res.status(200).send({ token })
}

var auth = {
    router,
    checkAuthenticated: (req, res, next) => {
        if (!req.header('authorization'))
            return res.status(401).send({ message: 'Unauthorized. Missing Auth Header' })

        var token = req.header('authorization').split(' ')[1]

        var payload = jwt.decode(token, '123')

        if (!payload)
            return res.status(401).send({ message: 'Unauthorized. Auth Header Invalid' })

        req.userId = payload.sub

        next()
    }
}
module.exports = auth