const fs = require('fs')
const path = require('path')

const express = require('express');
const readStreamRouter = express.Router();
const {readStream} = require('../utils/constants')

// const filePath = path.join(__dirname,'fruits.json')

readStreamRouter.get('/read/stream',(req,res)=>{

    // const json = JSON.stringify(arryaData)

    const readStreamFile = fs.createReadStream(readStream,{encoding : 'utf-8'})

    readStreamFile.on('data',(chunk)=>{
        console.log('-------Received chunk--------')
        console.log(chunk)
        res.write(chunk)
    })

    readStreamFile.on('end',()=>{
        console.log('Ending reading file')
        res.send('File reading is end')
    })

    readStreamFile.on('error',()=>{
        console.log('Error occurred',error.message)
    })
})

module.exports = readStreamRouter;

