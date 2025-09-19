// const express = require("express");
// const router = express.Router();
// const adminController = require("../controllers/adminController");

// // all admin routes are protected
// router.get(
//   "/admin",
//   adminController.requireAuth,
//   adminController.admin_dashboard
// );

// // create blog
// router.get(
//   "/admin/blogs/create",
// //   adminController.requireAuth,
//   adminController.blog_create_get
// );
// router.post(
//   "/admin/blogs",
//   adminController.requireAuth,
//   adminController.blog_create_post
// );

// // edit blog
// router.get(
//   "/admin/blogs/:id/edit",
//   adminController.requireAuth,
//   adminController.blog_edit_get
// );
// router.post(
//   "/admin/blogs/:id",
//   adminController.requireAuth,
//   adminController.blog_update
// ); // if using POST override
// // OR router.put("/admin/blogs/:id", adminController.requireAuth, adminController.blog_update);

// // delete blog
// router.post(
//   "/admin/blogs/:id/delete",
//   adminController.requireAuth,
//   adminController.blog_delete
// );
// // OR router.delete("/admin/blogs/:id", adminController.requireAuth, adminController.blog_delete);

// module.exports = router;
