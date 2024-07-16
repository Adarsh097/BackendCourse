// import the model
// in the comment model, we have also used the post model

const postModel = require("../models/post");
const commentModel = require("../models/commentModel");


//business logic
//using the save function, we can also enter the entity -> we should have the object beforehand

exports.createComment = async(req,res)=>{
    try{
        // fetch the data fromt the request body
        const {post,user,body} = req.body;
        //creating the object before hand
        const comment = new commentModel({
            post,user,body
        });
        // save the object in the db
        const savedComment = await comment.save();

        //find the post by ID, add the new comment entry in the comment array
        // we mention new:true so, that it will give the updated document with insert new comment id
        const updatedPost = await postModel.findByIdAndUpdate(post,{
            $push:{comments:savedComment._id}
        },{new:true}) 
        .populate("comments") //populate the comment array so that if we require the document, we can get that using the id of the comment
        .exec();
        res.status(200).json({
            post: updatedPost,
            message:"OK"
        })
    }
    catch(err){
        return res.status(500).json({
            error:"error while creating the comment",
        })
    }
}


// uncomment the post
exports.deleteComment = async(req,res)=>{
    try{
        const {post,comment} = req.body;
        console.log(post);
        console.log(comment);
        const deletedComment = await commentModel.findByIdAndDelete(comment);
    
        //removing comment from the post
        const updatedPost = await postModel.findByIdAndUpdate(post,{
            $pull:{comments:deletedComment._id}
        },{new:true});
        res.status(200).json({
            post: updatedPost,
            message:"OK"
        })
    }
    catch(err){
        return res.status(500).json({
            error:"error while deleting comment",
        })
    }
}