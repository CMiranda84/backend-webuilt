const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");
const express = require("express");
const multer = require("multer");

// Cloud name:	dv9rizbmb
// API key: 148114823343126
// API secret: emEA5Q4HPzk1nGMtoJPopywdaRg

cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: { folder: "projects",},
})
const parser = multer({storage: storage})

module.exports = parser