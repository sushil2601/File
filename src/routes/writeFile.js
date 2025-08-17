const fs = require('fs')
const fsPromise = require('fs/promises')
const express = require('express')
const writeRouter = express.Router();
const path1 = require('path')

const os = require('os')

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

writeRouter.post('/register',(req,res)=>{

    const {username,password} = req.body;

    if(!username || !password){
        return res.status(404).json({
            success : false,
            message : 'Please enter username and password'
        })
    }

    // const desktopPath = path1.join(os.homedir(),"Desktop")

    // const folderName = path1.join(desktopPath,username)

    // if(!fs.existsSync(folderName)){
    //     fs.mkdirSync(folderName)
    // }

    // const filePath = path1.join(os.homedir(),`${username}.txt`)

    const filePath = path1.join(path,`${username}.txt`)

    const data = `Username : ${username}\nPassword : ${password}`

    fs.writeFile(filePath,data,(err)=>{
        if(err){
            return res.status(400).json({
                success : false,
                message : 'Error saving file'
            })
        }
    })

    res.status(201).json({
        success : true,
        message : 'User saved successfully',
        file : filePath
    })


})

module.exports = writeRouter;