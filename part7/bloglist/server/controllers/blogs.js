const blogsRouter = require("express").Router();
const middleware = require("../utils/middleware");
const Blog = require("../models/blog");

blogsRouter.get("/", async (_request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });
  if (blog) {
    response.json(blog);
  }
  response.status(404).end();
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const user = request.user;
  if (!user) {
    return response.status(401).json({ error: "userId missing or not valid" });
  }

  const blog = request.body;
  const blogObject = new Blog({
    ...blog,
    likes: blog.likes || 0,
    user: user._id,
  });

  const newBlogObject = await blogObject.save();
  user.blogs = user.blogs.concat(newBlogObject._id);
  await user.save();
  response.status(201).json(newBlogObject);
});

blogsRouter.put("/:id", middleware.userExtractor, async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "userId missing or not valid" });
  }

  const id = request.params.id;
  const existingBlog = await Blog.findById(id);
  if (!existingBlog) {
    return response
      .status(404)
      .json({ error: `blog with id ${request.body.id} not found` });
  }

  const updatedBlog = request.body;
  const returnedBlog = await Blog.findByIdAndUpdate(id, updatedBlog);
  response.status(201).json(returnedBlog);
});

blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(204).json({ error: "blog does not exist" });
    } else if (user.id.toString() !== blog.user.toString()) {
      return response.status(401).json({ error: "userId missing or invalid" });
    }

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  },
);

module.exports = blogsRouter;
