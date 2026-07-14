const express = require('express')
const validateUser = require('../middleware/validator')
const Volunteer = require('../model/volunteer');
const volunteer = require('../model/volunteer');

const register = express.Router();


register.post('/', validateUser, async(req,res)=>{
    try {
        const { name, email, phone, role, message } = req.body;
        const newVolunteer = new Volunteer({
            name,
            email,
            phone,
            role,
            message
        });


        await newVolunteer.save();
        return res.status(201).json({ message: "Registration successful!" });
    } 
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Email is already registered" });
        }
        return res.status(500).json({ error: error.message });
    }
})


module.exports = register