const express = require("express");
const router = express.Router();
const {
  admin_dashboard,
  blog_create_get,
  blog_create_post,
  blog_edit_get,
  blog_update,
  blog_delete,
} = require("../controllers/adminController");

// Admin dashboard
router.get("/blogs", admin_dashboard);

// Create blog
router.get("/blogs/create", blog_create_get);
router.post("/blogs", blog_create_post);

// Edit blog
router.get("/blogs/:id/edit", blog_edit_get);
router.put("/blogs/:id", blog_update);

// Delete blog
router.delete("/blogs/:id", blog_delete);

module.exports = router;
