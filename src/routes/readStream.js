const fs = require('fs')
const path = require('path')

const express = require('express');
const readStreamRouter = express.Router();
const {readStream} = require('../utils/constants')

// const filePath = path.join(__dirname,)

const folderName = path.join(__dirname,'files')
const readPath = path.join(folderName,"Hello.josn")
const writePath = path.join(folderName,"world.json")

readStreamRouter.get('/stream/read',(req,res)=>{

    const readData = fs.createReadStream(readStream,{encoding : 'utf-8'})

    readData.on("data",(chunk)=>{
        console.log('New chunk arrived')
        console.log(chunk)
        // res.send(chunk)
    })

    readData.on("end",()=>{
        console.log('Finished reading')
    })

    readData.on("error",(err)=>{
        console.log("Error while reading file",err)
    })

    res.status(200).json({
        success : true,
        message : "File successfully read"
    })
})

readStreamRouter.get('/copy/read/write',(req,res)=>{

    const readStream1 = fs.createReadStream(readPath,{encoding: 'utf-8'})

    const writeStream =  fs.createWriteStream(writePath);

    readStream1.pipe(writeStream);

    writeStream.on("finish", () => {
        res.status(200).json({
            success: true,
            message: "File copied successfully"
        });
    });

    // Handle errors
    writeStream.on("error", (err) => {
        res.status(500).json({
            success: false,
            message: "Error while writing file",
            error: err.message
        });
    });

    readStream1.on("error", (err) => {
        res.status(500).json({
            success: false,
            message: "Error while reading file",
            error: err.message
        });


    res.status(200).json({
        success : true,
        message : 'File copies successfully'
    })
    })
})

module.exports = readStreamRouter;

