import { useState } from "react";
import PropTypes from "prop-types";

import {
  useBlogIds,
  useBlog,
  useDeleteBlog,
  useLikeBlog,
} from "../queries/blogs";
import { useNotification } from "../contexts/NotificationContext";
import { useUser } from "../contexts/UserContext";

const BlogList = () => {
  const blogIdsQuery = useBlogIds();

  if (blogIdsQuery.isError) return `Error: ${blogIdsQuery.error}`;
  if (blogIdsQuery.isPending) return "Loading blogs...";

  const blogIds = blogIdsQuery.data;

  return (
    <>
      {blogIds.map((id) => (
        <Blog key={id} id={id} />
      ))}
    </>
  );
};

export const Blog = ({ id }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { user } = useUser();
  const notification = useNotification();

  const likeBlog = useLikeBlog();
  const deleteBlog = useDeleteBlog();

  const blogQuery = useBlog(id);

  if (blogQuery.isError) return `Error: ${blogQuery.error}`;
  if (blogQuery.isPending) return "Loading blog...\n";

  const blog = blogQuery.data;

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
        {blog.title} {blog.author}
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

Blog.propTypes = {
  id: PropTypes.string.isRequired,
};

export default BlogList;
