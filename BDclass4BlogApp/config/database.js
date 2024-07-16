// we use mongoose library to make connection with db
const mongoose = require('mongoose');


require('dotenv').config();

//when we connect the connection, it return the promise
const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser : true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log(`Database Connected Successfully.`);
    })
    .catch((error)=>{
        console.log("Issue in DB connection.");
        console.log(error.messsage);
        process.exit(1);
    })
}

module.exports = dbConnect;