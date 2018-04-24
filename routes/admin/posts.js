const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");

router.all("/*", (req, res, next)=>{
    req.app.locals.layout = "admin";
    next();
});

router.get('/', function (req, res) {

    Post.find({}).then(posts=>{
        res.render("admin/posts", {posts: posts});
    });
});

router.get("/create", (req, res) => {
    res.render("admin/posts/create");
});
router.post("/create", (req, res) => {
    console.log(req.body);

    let allowComments = true;

    if(req.body.allowComments) {
        allowComments = true;
    } else {
        allowComments = false;
    }

    const newPost = new Post({
        title: req.body.title,
        status: req.body.status,
        allowComments: allowComments,
        body: req.body.body
    });

    console.log(newPost);

    newPost.save().then(savedPost => {
        res.redirect("/admin/posts");
    }).catch(error => {
        console.log("Post was not saved");
    });
});

module.exports = router;