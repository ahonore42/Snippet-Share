const Router = require('express').Router()
const AuthController = require('../controllers/AuthController')
const { StripHeaders, VerifyToken } = require('../middleware')

Router.post('/login', AuthController.Login)
Router.post('/register', AuthController.Register)
Router.get('/session', StripHeaders, VerifyToken, AuthController.GetCurrentUser)
Router.delete('/delete', StripHeaders, VerifyToken, AuthController.DeleteAccount)

module.exports = Router