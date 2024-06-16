const express = require('express')
const app = express.Router()
const userController = require('../controllers/userController')

app.get('/:id', userController.getUser )
app.post('/signup', userController.signup)
app.post('/login', userController.login)
app.put('/:id', userController.update)

module.exports = app