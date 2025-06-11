import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, incrLikes, tryDeleteBlog, canDeleteBlog }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleIsExpanded = () => setIsExpanded(!isExpanded);
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
            likes {blog.likes}{" "}
            <button onClick={async () => incrLikes(blog)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {canDeleteBlog && (
            <button onClick={async () => tryDeleteBlog(blog)}>remove</button>
          )}
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  incrLikes: PropTypes.func.isRequired,
  tryDeleteBlog: PropTypes.func.isRequired,
  canDeleteBlog: PropTypes.bool.isRequired,
};

export default Blog;
