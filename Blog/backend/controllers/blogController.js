const Blog = require("../models/blogModel");


exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      thumbnail: req.file ? req.file.path : null,
    });

    res.status(201).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.getBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, blogs });
};


exports.getBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog)
    return res.status(404).json({ message: "Blog not found" });

  res.status(200).json({ success: true, blog });
};


exports.updateBlog = async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!blog)
    return res.status(404).json({ message: "Blog not found" });

  res.status(200).json({ success: true, blog });
};


exports.deleteBlog = async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog)
    return res.status(404).json({ message: "Blog not found" });

  res.status(200).json({ success: true, message: "Blog deleted" });
};