const Blog = require("../models/blog");

// Show admin dashboard with all blogs
const admin_dashboard = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render("admin", { title: "Admin", blogs, error: null });
  } catch (err) {
    console.error(err);
    res.render("admin", {
      title: "Admin",
      blogs: [],
      error: "Error loading blogs",
    });
  }
};

// Show create blog form
const blog_create_get = (req, res) => {
  res.render("create", { title: "Create Blog" });
};

// Handle blog create
const blog_create_post = async (req, res) => {
  try {
    const blog = new Blog({
      title: req.body.title,
      snippet: req.body.snippet,
      body: req.body.body,
      image: req.file ? req.file.filename : null,
    });
    await blog.save();
    res.redirect("/admin/blogs"); // ✅ redirect to admin dashboard
  } catch (err) {
    console.error(err);
    res.render("create", {
      title: "Create Blog",
      error: "Error creating blog",
    });
  }
};

// Show edit blog form
const blog_edit_get = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.redirect("/admin/blogs");
    res.render("edit", { title: "Edit Blog", blog });
  } catch (err) {
    console.error(err);
    res.redirect("/admin/blogs");
  }
};

// Handle blog update
const blog_update = async (req, res) => {
  try {
    const { title, snippet, body } = req.body;
    const updatedBlog = {
      title,
      snippet,
      body,
      image: req.file ? req.file.filename : undefined,
    };
    await Blog.findByIdAndUpdate(req.params.id, updatedBlog, { new: true });
    res.redirect("/admin/blogs");
  } catch (err) {
    console.error(err);
    res.redirect("/admin/blogs");
  }
};

// Handle blog delete
const blog_delete = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect("/admin/blogs");
  } catch (err) {
    console.error(err);
    res.redirect("/admin/blogs");
  }
};

module.exports = {
  admin_dashboard,
  blog_create_get,
  blog_create_post,
  blog_edit_get,
  blog_update,
  blog_delete,
};
