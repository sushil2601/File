const express = require('express')
const deleteRouter = express.Router();

const fs = require('fs')

const {deleteFile} = require('../utils/constants')

deleteRouter.delete('/deleteFile',(req,res)=>{

    fs.unlink(deleteFile,(err)=>{
        if(err){
            return res.status(500).json({
                message : 'Error deleting file',
                error : err.message
            })
        }

        return res.status(200).json({
            message : 'File is deleted successfully'
        })
    })
})

module.exports = deleteRouter;