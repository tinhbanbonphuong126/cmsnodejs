const express = require("express");
const router = express.Router();

router.all("/*", (req, res, next)=>{
    req.app.locals.layout = "admin";
    next();
});


router.get('/', function (req, res) {
    res.render('admin/index');
});

router.get("/dashboard", (req, res)=>{
    res.render("admin/dashboard");
});

router.get("/contact", (req, res)=>{
    res.render("home/contact");
});

router.get("/login", (req, res)=>{
    res.render("home/login");
});

router.get("/register", (req, res)=>{
    res.render("home/register");
});

module.exports = router;