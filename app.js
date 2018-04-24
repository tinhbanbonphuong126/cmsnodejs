const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const mongoose  = require("mongoose");
const bodyParse = require("body-parser");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/cms", {}).then(db => {
   console.log("MongoDB is connected");
}).catch(error => console.log(error));

//Set static link
app.use(express.static(path.join(__dirname, "public")));

//Set view engines
app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

//Body Parser
app.use(bodyParse.urlencoded({extended: true}));
app.use(bodyParse.json());

//Import routes
const home = require("./routes/home/index");
const admin = require("./routes/admin/index");
const posts = require("./routes/admin/posts");

//Use routes
app.use("/", home);
app.use("/admin", admin);
app.use("/admin/posts", posts);

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



