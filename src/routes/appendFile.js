const express = require('express')
const appendRouter = express.Router();
const path = require('path')

const fs = require('fs')
const fsPromise = require('fs/promises')

const {readFile} = require('../utils/constants')
const {appendFile} = require('../utils/constants')

// appendRouter.post('/append',(req,res)=>{

//     const {content} = req.body;

//     const jsonData = JSON.stringify(content);

//     fs.appendFile(readFile,`\n${jsonData}`,(err)=>{
//         if(err){
//             return res.status(500).json({
//                 message : 'Error appending file',
//                 error : err.message
//             })
//         }

//         res.status(200).json({
//             message : 'Append to file is successfully'
//         })
//     })
// })

// appendRouter.post('/append',async(req,res)=>{

//     const {content} = req.body;
//     console.log(content)
//     // const jsonData = JSON.stringify(content);

//     try{
//         await fsPromise.appendFile(appendFile,content+'\n')
//         res.status(200).json({
//             message : 'data is appended successfully',
//         })
//     }catch(err){
//         return res.status(500).json({
//             message : 'Error appending file',
//             error : err.message
//         })
//     }

// })

const folderPath = path.join(__dirname,'files')
const filePath = path.join(folderPath,'World.txt')

appendRouter.post('/append',async(req,res)=>{

    const {content} = req.body;
    const json = JSON.stringify(content);

    try{
        await fsPromise.mkdir(folderPath,{recursive : true})

        await fsPromise.appendFile(filePath,json,'utf-8')

        res.status(200).json({
            message : 'Data appended successfully',
            filePath : filePath
        })
    }catch(err){
        return res.status(500).json({
            message : 'Error appending file',
            error : err.message
        })
    }

})

module.exports = appendRouter;