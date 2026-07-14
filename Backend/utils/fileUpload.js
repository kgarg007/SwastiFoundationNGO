const express = require('express')
const {v2 : cloudinary} = require('cloudinary')
const fs = require('fs')


cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
})


const uploadOnCloudinary = async(localfilePath)=>{
    try{
        if(!localfilePath){
            return "Error Occured"
        }

        const response = await cloudinary.uploader.upload(localfilePath,{
            resource_type:'auto'
        })

        return response;
    }
    catch(err){
        fs.unlinkSync(localfilePath)
    }
}


module.exports = uploadOnCloudinary