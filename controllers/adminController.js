// const Blog = require("../models/blog");

// // middleware to check if logged in
// const requireAuth = (req, res, next) => {
//   if (!req.session.user) {
//     return res.redirect("/login");
//   }
//   next();
// };

// // GET /admin → list all blogs
// const admin_dashboard = async (req, res) => {
//   try {
//     const blogs = await Blog.find().sort({ createdAt: -1 });
//     res.render("admin", { title: "Admin Dashboard", blogs });
//   } catch (err) {
//     console.error(err);
//     res.render("admin", {
//       title: "Admin Dashboard",
//       blogs: [],
//       error: "Error loading blogs",
//     });
//   }
// };

// // GET /admin/blogs/create → show form
// const blog_create_get = (req, res) => {
//   res.render("create", { title: "Create Blog" });
// };

// // POST /admin/blogs → save new blog
// const blog_create_post = async (req, res) => {
//   try {
//     const blog = new Blog(req.body);
//     await blog.save();
//     res.redirect("/admin");
//   } catch (err) {
//     console.error(err);
//     res.render("create", {
//       title: "Create Blog",
//       error: "Error creating blog",
//     });
//   }
// };

// // GET /admin/blogs/:id/edit → show edit form
// const blog_edit_get = async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);
//     if (!blog) return res.status(404).send("Blog not found");
//     res.render("edit", { title: "Edit Blog", blog });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error loading blog");
//   }
// };

// // PUT/PATCH /admin/blogs/:id → update blog
// const blog_update = async (req, res) => {
//   try {
//     await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.redirect("/admin");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error updating blog");
//   }
// };

// // DELETE /admin/blogs/:id → delete blog
// const blog_delete = async (req, res) => {
//   try {
//     await Blog.findByIdAndDelete(req.params.id);
//     res.redirect("/admin");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error deleting blog");
//   }
// };

// module.exports = {
//   requireAuth,
//   admin_dashboard,
//   blog_create_get,
//   blog_create_post,
//   blog_edit_get,
//   blog_update,
//   blog_delete,
// };
