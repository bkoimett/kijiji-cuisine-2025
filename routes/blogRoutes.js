const express = require("express");
const blogController = require("../controllers/blogController");
const router = express.Router();

// create route
// router.get("/create", blogController.blog_create_get);

// index - find blog
router.get("/", blogController.blog_index);

// post route handler
router.post("/", blogController.blog_create_post);

// findbyId route
router.get("/:id", blogController.blog_details);

// delete blog route
router.delete("/:id", blogController.blog_delete);

module.exports = router;
