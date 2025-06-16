import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAddComment, useBlog, useLikeBlog } from "../queries/blogs.js";

const Blog = () => {
  const { id: blogId } = useParams();
  const likeBlog = useLikeBlog();
  const addComment = useAddComment(blogId);
  const blogQuery = useBlog(blogId);

  const [comment, setComment] = useState("");

  if (blogQuery.isError) return blogQuery.error.message;
  if (blogQuery.isPending) return "Loading blog...";

  const blog = blogQuery.data;

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addComment.mutate(comment);
    setComment("");
  };

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
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="comment"
          value={comment}
          onChange={handleChange}
        ></input>
        <button type="submit">add comment</button>
      </form>
      {blog.comments && blog.comments.length > 0 ? (
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      ) : (
        <div>no comments</div>
      )}
    </div>
  );
};

export default Blog;
