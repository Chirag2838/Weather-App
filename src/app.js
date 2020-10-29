require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fetch = require('node-fetch');

const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async(req, res) => {
    res.render('homepage', {city: null, message: null});
});

app.post('/getWeather', async(req, res) => {
    console.log(req.body);
    try {
        const data = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+req.body.city+'&appid='+ process.env.API_KEY + '&units=metric');
        const result = await data.json();
        if(result.cod === '404') {
            return res.render('homepage', {message: result.message, city: null});
        }
        res.render('homepage', {temprature: result.main.temp, city: req.body.city, message: null});
    } catch (e) {
        res.status(400).send(e);
    }
})

app.listen(port, () => {
    console.log('server started at port '+ port);
})                                                                                                           