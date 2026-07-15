require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../model/admin');
const main = require('../database');

const username = process.argv[2] || process.env.ADMIN_USERNAME;
const password = process.argv[3] || process.env.ADMIN_PASS;

console.log(`Starting admin creation task...`);
console.log(`Target username: ${username}`);
console.log(`Target password: ${password}`);

main()
  .then(async () => {
    console.log("DB Connected successfully.");
    
    // Check if admin already exists
    const existing = await Admin.findOne({ username });
    if (existing) {
      console.log(`Admin user '${username}' already exists. Updating password...`);
      const salt = await bcrypt.genSalt(10);
      existing.password = await bcrypt.hash(password, salt);
      await existing.save();
      console.log(`Password updated successfully!`);
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const newAdmin = new Admin({
        username,
        password: hashedPassword
      });
      
      await newAdmin.save();
      console.log(`Admin user '${username}' created successfully!`);
    }
    
    mongoose.connection.close();
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error creating admin: ", err.message);
    process.exit(1);
  });
