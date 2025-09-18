const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// express app initialisation
const app = express();

// connect to MongoDB
const dbURI =
  "mongodb+srv://koimettb:1738@nodejstuts.rmg3aqa.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodejstuts";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000) && console.log("connection successful !")) // only listen if connection is made
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware and static - for all req including post
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// route handlers
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

// blog routes
app.use("/blogs", blogRoutes); // since we have scoped out the blogs, it makes the routes reusable

// 404 page - always at the bottom
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
