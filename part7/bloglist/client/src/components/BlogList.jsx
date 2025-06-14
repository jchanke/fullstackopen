import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { useBlogs, useDeleteBlog, useLikeBlog } from "../queries/blogs";
import { useNotification } from "../contexts/NotificationContext";
import { useCurrentUser } from "../contexts/UserContext";

const BlogList = () => {
  const blogsQuery = useBlogs();

  if (blogsQuery.isError) return `Error: ${blogsQuery.error}`;
  if (blogsQuery.isPending) return "Loading blogs...";

  const blogIds = blogsQuery.data;

  return (
    <>
      {blogIds.map((blog) => (
        <BlogListing key={blog.id} blog={blog} />
      ))}
    </>
  );
};

export const BlogListing = ({ blog }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { user } = useCurrentUser();
  const notification = useNotification();

  const likeBlog = useLikeBlog();
  const deleteBlog = useDeleteBlog();

  const canDeleteBlog = user.username === blog.user.username;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleIsExpanded = () => setIsExpanded(!isExpanded);

  const handleLike = (event) => {
    event.preventDefault();
    likeBlog.mutate(blog);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return;
    }
    try {
      deleteBlog.mutate(blog.id);
      notification.info(`delete blog '${blog.title}' successfully`);
    } catch (error) {
      notification.error(`unable to delete blog created by ${blog.user.name}`);
      console.error(`unable to delete blog: ${error.message}`);
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author}
        <button onClick={toggleIsExpanded}>
          {isExpanded ? "hide" : "view"}
        </button>
      </>
      {isExpanded && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {canDeleteBlog && <button onClick={handleDelete}>remove</button>}
        </>
      )}
    </div>
  );
};

BlogListing.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default BlogList;
