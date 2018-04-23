const express = require("express");
const router = express.Router();

router.get('/', function (req, res) {
    res.render('home');
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