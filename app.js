
require('dotenv').config()
const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

serverIP = process.env.SERVER_IP || '127.0.0.1'
PORT = process.env.PORT || 9000

//This is for testing on localhost
const mypip = '102.90.45.172'
app.get('/', (req, res) =>{
    res.json({
        "message": "Hello, HNG internship task 1!",
        "server_ip": serverIP,
        "port": PORT
    })
})


app.get('/api/hello', async(req,res)=>{
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const client_ip = ip.includes('::') ? mypip : ip
    
    try{
        const response = await axios.get(`https://api.ip2location.io/?key=${process.env.API_KEY1}&ip=${client_ip}`, { method: 'POST', body: 'a=1' });
        const { city_name } = response.data

        const response2 = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY2}&q=${city_name}`);
        const temp = response2.data.current.temp_c
        const params = req.query
        
        res.json({
            "client_ip": client_ip,
            "location": city_name,
            "greeting": `Hello,${params.visitor_name}, the temperature is ${temp} degrees Celcius in ${city_name}`,

        })
    }
    catch(err){
        console.error(err)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

)






app.listen((PORT),()=>{
    console.log(`Server is running at ${serverIP}`)
})