const postModel = require("../models/post");

// for creating the post
exports.createPost = async(req,res)=>{
    try{
        //get the title and body of post from the req.body
        const {title,body} = req.body;

        // create the entry in db
        const response = await postModel.create({title,body});
        res.status(200).json({
            success:true,
            data:response,
            message:"OK"
        })
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
            data:"internal server error",
            message:err.message
        })

    }
}


 
// display all the blog post
exports.displayPosts = async(req,res)=>{
    try{
        // if you want the actual likes and comment instead of the id of the likes and comment then, you need to populate the things
        const posts = await postModel.find({}).populate("likes").populate("comments").exec();
        res.status(200).json({
            success:true,
            data:posts,
            message:"displayed all the posts"
        })
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
            data:"internal server error",
            message:err.message
        })
    }
}


//delete the posts
exports.deletePost = async(req,res)=>{
    try{
        // fetch the post id to delete
        const {post_id} = req.headers;
        const deletedPost = await postModel.findByIdAndDelete(post_id);
        res.status(200).json({
            success:true,
            data:deletedPost,
            message:"OK"
        })
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500).json({
            success:false,
            data:"internal server error",
            message:err.message
        })
    }
}