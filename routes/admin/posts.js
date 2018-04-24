const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");

router.all("/*", (req, res, next)=>{
    req.app.locals.layout = "admin";
    next();
});

router.get('/', function (req, res) {
    res.send("It's work");
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
    Post({
        title: req.body.title,
        status: req.body.status,
        allowComments: allowComments,
        body: req.body.body
    })
});

module.exports = router;