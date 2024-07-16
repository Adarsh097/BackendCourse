//map routes with the controllers

const express = require("express");
const router = express.Router();

// import the constroller
const {createPost} = require("../controllers/posts");
const {displayPosts} = require("../controllers/posts");
const {createComment} = require("../controllers/comments");
const {likepost} = require("../controllers/likes");
const {unlikePost} = require("../controllers/likes");
const {deletePost} = require("../controllers/posts");
const {deleteComment} = require("../controllers/comments");

// defining the API to hit for the controller functions
router.post("/createpost",createPost);
router.get("/post",displayPosts);
router.post("/createcomment",createComment);
router.post("/likes/like",likepost);
router.post("/likes/unlike",unlikePost);
router.delete("/delete/post",deletePost);
router.delete("/delete/comment",deleteComment);


module.exports = router;