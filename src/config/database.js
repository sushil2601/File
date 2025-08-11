const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.DB_URL,{
    })
    .then(()=>{
        console.log('Database is connected successfully....')
    })
    }catch(err){
        console.log('Connection failed ....')
        process.exit(1)
    }
}

module.exports = connectDB;