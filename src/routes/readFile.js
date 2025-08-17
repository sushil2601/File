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


module.exports = readRouter;