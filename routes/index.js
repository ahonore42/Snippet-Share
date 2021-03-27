const AppRouter = require('express').Router()
const AuthRouter = require('./AuthRouter')
const SnippetRouter = require('./SnippetRouter')


AppRouter.use('/auth', AuthRouter)
AppRouter.use('/snippets', SnippetRouter)



module.exports = AppRouter