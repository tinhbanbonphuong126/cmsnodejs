const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const mongoose  = require("mongoose");
const bodyParse = require("body-parser");
const methodOverrid = require("method-override");
const upload = require("express-fileupload");
const session = require("express-session");
const flash = require("connect-flash");



mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/cms", {}).then(db => {
   console.log("MongoDB is connected");
}).catch(error => console.log(error));

//Set static link
app.use(express.static(path.join(__dirname, "public")));

//Import helpers
const {select, GenerateTime} = require("./helpers/handlebars-helpers");

//Set view engines
app.engine('handlebars', exphbs({defaultLayout: 'home', helpers: {select: select, GenerateTime: GenerateTime}}));
app.set('view engine', 'handlebars');

//Upload middleware
app.use(upload());

//Connect flash
app.use(session({
    cookie: {maxAge: 60000},
    secret: 'woot',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

// Local variable using middleware.
app.use((req, res, next) => {
    res.locals.success_message = req.flash('success_message')
    next()
})
//Body Parser
app.use(bodyParse.urlencoded({extended: true}));
app.use(bodyParse.json());

//Method Override
app.use(methodOverrid("_method"));

//Import routes
const home = require("./routes/home/index");
const admin = require("./routes/admin/index");
const posts = require("./routes/admin/posts");

//General Dummy Data.
const generates = require("./routes/admin/generates");

//Use routes
app.use("/", home);
app.use("/admin", admin);
app.use("/admin/posts", posts);
app.use("/admin/generate", generates);

app.listen(3000, ()=>{
    console.log("Server serving");
});



// const mongoose = require("mongoose");
// const bodyParse = require("body-parser");
// const bcrypt = require("bcryptjs");
// const User = require("./models/User");
//
// app.use(bodyParse.json());
// app.use(bodyParse.urlencoded({extended: true}));
//
// mongoose.Promise = global.Promise;
//
// mongoose.connect("mongodb://127.0.0.1/login", () => {
//     console.log("DB CONNECT");
// });
//
// app.post("/register", (req, res) => {
//     const newUser = new User();
//     newUser.email = req.body.email;
//     newUser.password = req.body.password;
//     bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if (err) return err;
//
//             newUser.password = hash;
//             newUser.save().then(userSaved => {
//                 res.send("USER SAVED");
//             }).catch(err => {
//                 res.send("User was not save because ..." + err);
//             });
//         });
//     });
// });

// app.post("/login", (req, res) => {
//     User.findOne({email: req.body.email}).then(user => {
//         if (user) {
//             bcrypt.compare(req.body.password, user.password, (err, matched) => {
//                 if (err) return err;
//                 if (matched) {
//                     res.send("User was able to login");
//                 } else {
//                     res.send("User not login");
//                 }
//             });
//         }
//     });
// });



