const express = require("express");
const router = express.Router();

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

module.exports = router;