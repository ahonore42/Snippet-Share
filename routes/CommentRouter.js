const Router = require('express').Router()
const CommentController = require('../controllers/CommentController')
const { StripHeaders, VerifyToken } = require('../middleware')

Router.post('/add/:id', StripHeaders, VerifyToken, CommentController.AddComment)

module.exports = Router