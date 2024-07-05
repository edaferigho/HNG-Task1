
require('dotenv').config()
const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/api/hello', async(req,res)=>{
    const response = await axios.get(`https://api.ip2location.io/?key=${process.env.API_KEY1}&ip=${req.ip}`, { method: 'POST', body: 'a=1' });
    const data = response.data
    //const response2 = await axios.post(` http://api.weatherapi.com/v1/current.json/?key=ba3b4e2134d6424cb0f123907240507&q=${data.city}`);
    const params = req.query
    console.log(data)
    res.json({
        "client_ip":data.ip,
        "location": data.city,
        "greeting": `Hello,${params.visitor_name}, the temperature is  degrees Celcius in //`,
        params: params
    })
})






app.listen((process.env.PORT),()=>{
    console.log(`Server is running at ${process.env.SERVER_NAME}`)
})