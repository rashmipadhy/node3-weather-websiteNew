/*//******************Serving up HTML and JSON*****************
const express = require('express')

console.log(__dirname)
console.log(__filename)
const app = express()

app.get('',(req,res) => {
    res.send('Hello Express')
})

app.get('/help',(req,res) => {
    res.send('<h1>Help page</h1>')
})

app.get('/about',(req,res) => {
    res.send('<h2>About Web-Server</h2>')
})

app.get('/weather',(req,res) => {
    res.send({
        forecast: 'Rain',
        location: 'odisha'
    })
})

app.listen(3000,() => {
    console.log('Server is running on port 3000')
})*****************************/

/********************Serving up Static Assets
const path = require('path')
const express = require('express')

//console.log(__dirname)
//console.log(__filename)
const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath))


app.listen(3000,() => {
    console.log('Server is running on port 3000')
})*************************************/

//Dynamic Page with Handlebars and customize the view directory
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
//for heroku
const port = process.env.PORT || 3000
//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup Handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Setup route for index.hbs
app.get('',(req,res) => {
    res.render('index',{
        title:'Weather App',
        name: 'Rashmi'
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title:'About Me',
        name: 'Rashmi'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        message: 'This is some helpful Text',
        title:'Help',
        name: 'Rashmi'
    })
})
app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'you must provide an address'
        })
    }
   /* console.log(req.query.address)
    res.send({
        forecast: 'Rain',
        location: 'odisha',
        address: req.query.address //add address property onto JSON
    })*/
    geocode(req.query.address, (error, {latitude,longitude,location} = {} ) => {
        if (error) {
            return res.send(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address

            })
        })
    })
})

app.get('/products',(req,res)=>{
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        errorMessage: 'Help article not found',
        title:'404',
        name: 'Rashmi'
    })
})
app.get('*',(req,res) =>{
    res.render('404',{
        title:'404',
        name: 'Rashmi',
        errorMessage:'Page not found'
    })
})
/*app.listen(3000,() => {
    console.log('Server is running on port 3000')
})*/
//for heroku
app.listen(port,() => {
    console.log('Server is running on port ' + port)
})
