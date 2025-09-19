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

// authentication routes
app.use(authRoutes);

// create
app.get("/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// blog routes
app.use("/blogs", blogRoutes); // since we have scoped out the blogs, it makes the routes reusable


// connect to MongoDB
const dbURI =
  "mongodb+srv://koimettb:1738@nodejstuts.rmg3aqa.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodejstuts";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000) && console.log("connection successful !")) // only listen if connection is made
  .catch((err) => console.log(err));
  
// register view engine
app.set("view engine", "ejs");

// 404 page - always at the bottom
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});