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


router.get("/edit/:id", (req,res)=>{

    Post.findOne({_id: req.params.id}).then(post=>{
        res.render("admin/posts/edit", {post: post});
    });


});

router.put("/edit/:id", (req, res) => {
    Post.findOne({_id: req.params.id})
        .then(post=>{
            if(req.body.allowComments) {
                allowComments = true;
            } else {
                allowComments = false;
            }

            post.title = req.body.title;
            post.body = req.body.body;
            post.allowComments = allowComments;
            post.status = req.body.status;

            post.save().then(updatedPost => {
                res.redirect("/admin/posts");
            });

        })
});


module.exports = router;