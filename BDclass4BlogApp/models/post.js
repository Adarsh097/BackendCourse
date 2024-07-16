 const mongoose = require('mongoose');
// here, we are defining the schema to tell how a post is store in the db

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxLength:50,
    },
    body:{
        type:String,
        required:true,
        maxLength:5000,
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now(),
    },
    updatedAt:{
        type:Date,
        required:true,
        default:Date.now(),
    },
    likes : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "likeModel"
    }],
    comments : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "commentModel"
    }]
});

module.exports = mongoose.model("postModel",postSchema);
// this will be imported in controller