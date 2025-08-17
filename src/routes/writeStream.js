const fs = require('fs')
const express = require('express')

const writeRouter = express.Router();

const path = require('path')

const folderPath = path.join(__dirname,'files')
const filPath = path.join(folderPath,'write.json')

writeRouter.post('/stream/write',(req,res)=>{

    const {content} = req.body;

    const jsonData =  JSON.stringify(content);

    const writeData = fs.createWriteStream(filPath)

    writeData.write(jsonData);

    writeData.end('final line written\n')

    writeData.on("finish",()=>{
        console.log("All data has been written successfully.");
    })

    writeData.on("error", (err) => {
    console.error("Error while writing file:", err);
    });

    res.status(200).json({
        success : true,
        message : 'Write perform successfully'
    })
})

module.exports = writeRouter;