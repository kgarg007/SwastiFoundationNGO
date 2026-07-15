const mongoose = require('mongoose');
const dns = require('dns');

const main = async () => {
    // Force Node.js DNS resolver to use Google's public DNS servers
    // This bypasses querySrv ECONNREFUSED errors caused by some ISP DNS servers
    try {
        dns.setServers(['8.8.8.8', '8.8.4.4']);
    } catch (e) {
        console.warn("Failed to set DNS servers:", e.message);
    }

    await mongoose.connect(process.env.MONGODB_URL);
};

module.exports = main;