const express = require("express");
const router = express.Router();
const Post = require('../../models/Post')


router.all("/*", (req, res, next)=>{
    req.app.locals.layout = "home";
    next();
});

router.get('/', function (req, res) {

    Post.find({}).then(posts => {
        res.render('home/index', {posts: posts});
    })
});

router.get("/about", (req, res)=>{
    res.render("home/about");
});

router.get("/services", (req, res)=>{
    res.render("home/services");
});

router.get("/contact", (req, res)=>{
    res.render("home/contact");
});

router.get("/login", (req, res)=>{
    res.render("home/login");
});


module.exports = router;