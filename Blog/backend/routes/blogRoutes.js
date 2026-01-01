const express = require("express");
const upload = require("../middleware/blogUpload");
const {
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog
} = require("../controllers/blogController");

const router = express.Router();

router.post("/create", upload.single("thumbnail"), createBlog);
router.get("/", getBlogs);
router.get("/:id", getBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
