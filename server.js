const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')
const path = require('path')
const AppRouter = require('./routes')

const PORT = process.env.PORT || 3001

app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/build/index.html`))
  })
}

app.use('/api', AppRouter)

app.listen(PORT, () => console.log(`Server Started On Port: ${PORT}`))