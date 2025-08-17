const fs = require('fs')
const fs1 = require('fs/promises')
const express = require('express')
const readRouter = express.Router();
const path =  require('path')

const {readFile,appendFile} = require('../utils/constants');

//Read File

// readRouter.get('/read',(req,res)=>{
    
//     console.log('Resolved File path',readFile)

//     fs.readFile(readFile,'utf8',(err,data)=>{
//         if(err){
//             return res.status(500).json({
//                 message : 'Error reading File',
//                 error : err.message
//             })
//         }
//         console.log('Data: ',data)
//         res.send(data)
//     })
// })

// readRouter.get('/read',(req,res)=>{

//     fs1.readFile(readFile,'utf8')
//     .then((data)=>{
//         return res.status(200).json({
//             message : 'Read file is successfully',
//             data
//         })
//     })
//     .catch((err)=>{
//         return res.status(500).json(({
//             message : 'Error reading file',
//             error : err.message
//         }))
//     })
// })

//const filePath = __dirname + '/files/Hello.json';
//const filePath = path.resolve(__dirname, 'files', 'Hello.json');

const filePath = path.join(__dirname,'/files/Hello.json')

readRouter.get('/read',async(req,res)=>{

    try{
        const data  = await fs1.readFile(filePath,'utf-8');
        res.status(200).json({
            message : 'Read file successfully',
            data : data
        })
    }catch(err){
        return res.status(404).json({
            message : 'Error read file',
            error : err.message
        })
    }
})

readRouter.get('/open/file',(req,res)=>{

    fs.open(readFile,"r",(err,fd)=>{
        if (err) {
    return console.error("Error opening file:", err);
  }
    console.log("File opened successfully, file descriptor:", fd);
    fs.close(fd, () => console.log("File closed."));
    })
    res.status(200).json({
    success : true,
    message : 'File Open successfully'
})
})

const oldPath = path.join(__dirname,'files','Hello.txt');
const newPath = path.join(__dirname,'files','source.txt')

readRouter.get("/rename/file",(req,res)=>{

    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            return console.error("Error renaming/moving file:", err);
          }
    })

    res.status(200).json({
        success: true,
        message : 'File renamed successfully'
    })
})


module.exports = readRouter;