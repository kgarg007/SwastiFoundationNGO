require('dotenv').config()
const express = require('express')
const cors = require('cors')
const volunteer = require('./model/volunteer')
const main = require('./database')
const register = require('./routes/volunteerRegis')

const app  = express();

app.use(cors());
app.use(express.json());


// Routing
app.use('/regis', register);
app.use('/auth', require('./routes/auth'));
app.use('/programs', require('./routes/programs'));
app.use('/stories', require('./routes/stories'));
app.use('/gallery', require('./routes/gallery'));
app.use('/events', require('./routes/events'));
app.use('/blog', require('./routes/blog'));
app.use('/settings', require('./routes/settings'));
app.use('/submissions', require('./routes/submissions'));





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