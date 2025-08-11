const fs = require('fs')
const fsPromise = require('fs/promises')
const express = require('express')
const writeRouter = express.Router();
const path1 = require('path')

const {path} = require('../utils/constants')

// writeRouter.post('/write',(req,res)=>{

//     const {fileName,content} = req.body;
//     const jsonString = JSON.stringify(content)

//     fs.writeFile(`${path}/${fileName}`,jsonString,(err,data)=>{

//         if(err){
//             return res.status(500).json({
//                 message : 'Error writing file',
//                 error : err.message
//             })
//         }

//         res.status(200).json({
//             message : 'Write operation is successfully',
//         })
//     })
// })

//create folder inside project directory

const folderPath = path1.join(__dirname,'files')
// const filePath = path1.join(folderPath,'Hello.txt')
const filePath = path1.join(folderPath,'Hello.json')


writeRouter.post('/write',async(req,res)=>{
    const {content} = req.body;

    const json = JSON.stringify(content)
    
    try{

        await fsPromise.mkdir(folderPath,{recursive : true})

        await fsPromise.writeFile(filePath,json,'utf-8')

        res.status(200).json({
            message : 'Data written successfully',
            filePath : filePath
        })

    }catch(err){
        return res.status(500).json({
            message : 'Error writting file',
            error : err.message
        })
    }

})

module.exports = writeRouter;