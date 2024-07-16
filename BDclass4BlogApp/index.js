const express = require('express');
const app = express();

// load configurations from .env file to process object
require('dotenv').config();
const PORT = process.env.PORT || 5000;


// middleware to parse json data in the req.body
app.use(express.json());

// import of the blog routes
const blogRoutes = require("./routes/blog");

// mount the blog routes
app.use("/api/v1",blogRoutes); 



//starting the server
app.listen(PORT,()=>{
    console.log(`server is running on PORT no: ${PORT}`);
});

// connect the database server
const dbConnect = require("./config/database");
// function calling to start the process of db connection
dbConnect();


// default route
app.get("/",(req,res)=>{
    res.send(`<h1>This is our HOME PAGE of BLOG PAGE!</h1>`);
});