const express = require('express');
const connectDB = require('./src/config/database');
const app = express();
require('dotenv').config();

connectDB();

const readRouter = require('./src/routes/readFile')
const writeRouter = require('./src/routes/writeFile')
const appendRouter = require('./src/routes/appendFile')
const deleteRouter = require('./src/routes/deleteFile')
const readStreamRouter = require('./src/routes/readStream')
const writeStreamRouter = require('./src/routes/writeStream')

app.use(express.json());

app.use('/',readRouter);
app.use('/',writeRouter);
app.use('/',appendRouter);
app.use('/',deleteRouter);
app.use('/',readStreamRouter);
app.use('/',writeStreamRouter)

app.listen(3000,()=>{
    console.log('App is running at port 3000....')
})

//open file
//rename / move file
//use modes



// app.use('/',(req,res)=>{
//     res.send('Hello World')
// })