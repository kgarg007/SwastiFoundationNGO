const mongoose = require('mongoose');
const dns = require('dns');

const main = async () => {
    try {
        dns.setServers(['8.8.8.8', '8.8.4.4']);
    } catch (e) {
        console.warn("Failed to set DNS servers:", e.message);
    }

    await mongoose.connect(process.env.MONGODB_URL);
}

module.exports = main;