
require('dotenv').config()
const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/api/hello', async(req,res)=>{
    const response = await axios.get(`https://api.ip2location.io/?key=${process.env.API_KEY1}&ip=${req.ip}`, { method: 'POST', body: 'a=1' });
    const data = response.data
    const response2 = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY2}&q=${data.city}`);
    const params = req.query
    console.log(response2.data)
    res.json({
        "client_ip":data.ip,
        "location": data.city,
        "greeting": `Hello,${params.visitor_name}, the temperature is ${response.data.current.temp_c}degrees Celcius in ${data.city}`,
        
    })
})






app.listen((process.env.PORT),()=>{
    console.log(`Server is running at ${process.env.SERVER_NAME}`)
})