const mongoose = require('mongoose');
const dns = require('dns');

const main = async () => {
    try {
        dns.setServers(['8.8.8.8', '8.8.4.4']);
    } catch (e) {
        console.warn("Failed to set DNS servers:", e.message);
    }

    let mongoUrl = process.env.MONGODB_URL || '';
    if (mongoUrl) {
        // Fix double-slash typos in db path (e.g., .net//SwastiFoundation -> .net/SwastiFoundation)
        mongoUrl = mongoUrl.replace(/([^:]\/)\/+/g, '$1');
    }

    await mongoose.connect(mongoUrl);
}

module.exports = main;