const Router = require('express').Router()
const SnippetController = require('../controllers/SnippetController')
const { StripHeaders, VerifyToken } = require('../middleware')

Router.get('/', SnippetController.GetSnippets)
Router.get('/:id', SnippetController.GetSnippetById)
Router.post('/', StripHeaders, VerifyToken, SnippetController.CreateSnippet)
Router.put('/:id', StripHeaders, VerifyToken, SnippetController.UpdateSnippet)
Router.delete('/:id', StripHeaders, VerifyToken, SnippetController.DeleteSnippet)

module.exports = Router