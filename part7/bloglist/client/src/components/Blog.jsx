import { useParams } from "react-router-dom";
import { useBlog, useLikeBlog } from "../queries/blogs.js";

const Blog = () => {
  const { id: blogId } = useParams();
  const likeBlog = useLikeBlog();
  const blogQuery = useBlog(blogId);

  if (blogQuery.isError) return blogQuery.error.message;
  if (blogQuery.isPending) return "Loading blog...";

  const blog = blogQuery.data;

  const handleLike = (event) => {
    event.preventDefault();
    likeBlog.mutate(blog);
  };

  return (
    <div>
      <h2>
        {blog.title} <em>by {blog.author}</em>
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      <>added by {blog.user.name}</>
    </div>
  );
};

export default Blog;
