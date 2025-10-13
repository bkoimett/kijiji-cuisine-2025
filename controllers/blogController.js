const Blog = require("../models/blog");
const path = require("path");
const mongoose = require("mongoose");

// blog_index
const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

// blog_details
const blog_details = (req, res) => {
  const id = req.params.id;

  // ✅ Avoid CastError for invalid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid blog ID");
  }

  Blog.findById(id)
    .then((result) => {
      if (!result) return res.status(404).send("Blog not found");
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => console.log(err));
};

// blog_create_post
const blog_create_post = (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body,
    image: req.file ? req.file.filename : null, // save filename
  });

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

// blog_delete
const blog_delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.redirect("/admin/blogs");
    })
    .catch((err) => console.log(err));
};

// blog_preview
const blog_preview = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .limit(5) // only latest 5 blogs
    .then((result) => {
      res.render("partials/blogPreview", { blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_post,
  blog_delete,
  blog_preview,
};
