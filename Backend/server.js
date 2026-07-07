require('dotenv').config()
const express = require('express')
const volunteer = require('./model/volunteer')
const main = require('./database')

const app  = express();

app.use(express.json());





main()
    .then(()=>{
        console.log("DB Connected successfully");

        app.listen(3000,()=>{
            console.log("Listening at port 3000");
        })
    })

    .catch((err)=>{
        console.log("Error: "+err.message);
    })