const express = require("express");
const blogController = require("../controllers/blogController");
const router = express.Router();

const multer = require("multer");
const path = require("path");

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })

// index - find blog
router.get("/", blogController.blog_index);

// create blog (with image)
router.post("/", upload.single("image"), blogController.blog_create_post);

// findbyId route
router.get("/:id", blogController.blog_details);

// delete blog route
router.delete("/:id", blogController.blog_delete);

module.exports = router;
