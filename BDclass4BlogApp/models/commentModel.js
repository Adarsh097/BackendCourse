const mongoose = require('mongoose');

/*
    -kis post pe comment kiya hai
    -comment body
    -user jisne comment kiya hai
*/

const commentSchema = new mongoose.Schema({
    post:{
        //when you are refering another model/object using its id
        type:mongoose.Schema.Types.ObjectId,
        ref:"postModel",//reference to the post model
    },
    user: {
        type:String,
        required: true,
    },
    body: {
        type:String,
        required:true,
    }
});


//export the model
module.exports = mongoose.model('commentModel',commentSchema);