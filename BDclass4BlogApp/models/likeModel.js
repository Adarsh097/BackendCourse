const mongoose = require('mongoose');


// route handler
/*
    -post
    -user
*/

const likeSchema = mongoose.Schema({
    post :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "postModel",//reference to the post model
    },
    user: {
        type: String,
        required : true
    }
});

module.exports = mongoose.model("likeModel",likeSchema);