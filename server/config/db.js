const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI_PRODUCTION);
        console.log("MongoDB connected!")
    }catch(error){
        console.error("Trouble connecting!", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;