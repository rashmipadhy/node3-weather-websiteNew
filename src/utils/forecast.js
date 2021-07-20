/*const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=26af1216f92809f480a41921521713a8&query=' + latitude+ ',' + longitude + '&units=f'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined,response.body.current.weather_descriptions + '. It is currently '+response.body.current.temperature +' degree out. There is a ' + response.body.current.precip + '% chance of rain.')         
            
        }
    })
}

module.exports = forecast */

// ***************************Destructuring and Property Shorthand in weatherApp ********************************
const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=26af1216f92809f480a41921521713a8&query=' + latitude+ ',' + longitude + '&units=f'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            //console.log(body.current.weather_descriptions[0])
            callback(undefined,body.current.weather_descriptions[0] + '. It is currently '+body.current.temperature +' degree out. It fells like  ' + body. current.feelslike +' degree out. The humidity is '+body.current.humidity + '%' + ' There is a ' + body.current.precip + '% chance of rain.')         
            
        }
    })
}

module.exports = forecast