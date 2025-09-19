const bcrypt = require("bcrypt");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");

// module imports
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const Blog = require("./models/blog");
const auth = require("./models/auth");
const { title } = require("process");

// express app initialisation
const app = express();

// middleware and static - for all req including post
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(session({
  secret: "your-secret-key",
  resave: false,
  saveUninitialized: false,
}));

// route handlers
app.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});




// logins
// app.get("/login", (req, res) => {
//   res.render("login", { title: "Login" });
// });
// app.get("/signup", (req, res) => {
//   res.render("signup", { title: "SignUp" });
// });

// registration route
// app.post("/signup", async (req, res) => {
//   const auths = new auth({
//     name: req.body.username,
//     password: req.body.password,
//   });

//   const existingUser = await auth.findOne({ name: auths.name });
//   if (existingUser) {
//     return res.render("signup", {
//       error: "User already exists. Please choose a different username.",
//     });
//   } else {
//     // hash passwords with bcrypt
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(auths.password, saltRounds);

//     auths.password = hashedPassword; // replace the hash password with original password

//     try {
//       const result = await auths.save();
//       res.redirect("/login");
//     } catch (err) {
//       console.log(err);
//       res.render("signup", {
//         error: "Error creating user. Please try again.",
//       });
//     }
//   }
// });

// // Login user
// app.post("/login", async (req, res) => {
//   try {
//     const check = await auth.findOne({ name: req.body.username }); // ✅ use model
//     if (!check) {
//       return res.render("login", {
//         error: "User not found. Please sign up first.",
//       });
//     }

//     // Compare password
//     const isPasswordMatch = await bcrypt.compare(
//       req.body.password,
//       check.password
//     );
//     if (!isPasswordMatch) {
//       return res.render("login", {
//         error: "Wrong password. Please try again.",
//       });
//     }

//     // Successful login -> fetch blogs for admin
//     const blogs = await Blog.find().sort({ createdAt: -1 });
//     return res.render("admin", { title: "Admin", blogs });
//   } catch (err) {
//     console.error(err);
//     return res.render("login", {
//       error: "Something went wrong. Please try again.",
//     });
//   }
// });



// authentication routes
app.use(authRoutes);


// create
app.get("/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// blog routes
app.use("/blogs", blogRoutes); // since we have scoped out the blogs, it makes the routes reusable




// 404 page - always at the bottom
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});


// connect to MongoDB
const dbURI =
  "mongodb+srv://koimettb:1738@nodejstuts.rmg3aqa.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodejstuts";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000) && console.log("connection successful !")) // only listen if connection is made
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");