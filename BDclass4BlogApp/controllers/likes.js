const { deleteModel } = require("mongoose");
const likeModel = require("../models/likeModel");
const postModel = require("../models/post");


// like the post
 exports.likepost = async(req,res)=>{
    try{
        const {post,user} = req.body;
        const likeObj = new likeModel({post,user});
        const savedLike = await likeObj.save();
        //update the post collection -> marking the entry of the like
        const updatedPost = await postModel.findByIdAndUpdate(post,{
            $push: {likes:savedLike._id}
        },{new:true}).populate("likes").exec();

        res.status(200).json({
            post: updatedPost,
            message:"OK"
        })
    }
    catch(err){
        return res.status(500).json({
            error:"error while creating the like",
        })
    }
 }




//controller for unliking the post
exports.unlikePost = async(req,res)=>{
    try{
        // get the post to be unliked and like_id entry
        const {post,like} = req.body;
        //find and the delete from the like collection
        const deletedLike = await likeModel.findOneAndDelete({_id:like,post:post});
        // update the post collection
        const updatedPost = await postModel.findByIdAndUpdate(post,{
            $pull:{likes:deletedLike._id}
        },{new:true});
        res.status(200).json({
            post: updatedPost,
            message:"OK"
        })
    }
    catch(err){
        return res.status(500).json({
            error:"error while unliking",
        })
    }
}