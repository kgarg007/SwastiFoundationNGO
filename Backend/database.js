const mongoose = require('mongoose');


const main = async ()=>{
    await mongoose.connect(process.env.MONGODB_URL);
}

module.exports = main;