import configViewEngine from './configs/viewEngine'
import express from 'express'
import initWebRoute from './router/web'
import initApiRoute from './router/api'
require('dotenv').config()
var morgan = require('morgan')

const app = express()
const port = process.env.PORT

app.use((req, res) =>{
    
})
app.use(morgan('combined'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// setup view engine
configViewEngine(app)

//init web router
initWebRoute(app)

//init api router
initApiRoute(app)


//handle 404 not found
app.use((req, res) =>{
    return res.render('404.ejs')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})