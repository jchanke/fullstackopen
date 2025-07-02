import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAddComment, useBlog, useLikeBlog } from "../queries/blogs.js";
import { Button, Heading, Highlight } from "@chakra-ui/react";

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
      <Heading>
        <Highlight>{blog.title}</Highlight>
        by {blog.author}
      </Heading>
      <div>
        <Link to={blog.url}>{blog.url}</Link>
      </div>
      <div>
        {blog.likes} likes{" "}
        <Button onClick={handleLike} size="sm">
          like
        </Button>
      </div>
      <>added by {blog.user.name}</>
      <Heading>comments</Heading>
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
