const express = require("express");
const multer = require("multer");
const path = require("path");
const Image = require("../models/image");

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // store in /public/uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

const upload = multer({ storage });

// GET: show gallery page
router.get("/", async (req, res) => {
  try {
    const images = await Image.find().sort({ uploadedAt: -1 });
    res.render("gallery", { title: "Gallery", images });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching images");
  }
});

// POST: upload new image
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = "/uploads/" + req.file.filename;
    await Image.create({ imageUrl });
    res.redirect("/gallery");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error uploading image");
  }
});

// DELETE: delete image by id
router.post("/delete/:id", async (req, res) => {
  try {
    await Image.findByIdAndDelete(req.params.id);
    res.redirect("/gallery");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting image");
  }
});

module.exports = router;
