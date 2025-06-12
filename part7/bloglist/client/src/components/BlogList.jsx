import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { displayInfo, displayError } from "../reducers/notificationReducer";
import { deleteBlogById, fetchBlogs, voteFor } from "../reducers/blogsReducer";

const Blog = ({ blog, canDeleteBlog }) => {
  const dispatch = useDispatch();

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleIsExpanded = () => setIsExpanded(!isExpanded);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return;
    }
    try {
      dispatch(deleteBlogById(blog.id));
      dispatch(displayInfo(`deleted blog '${blog.title}'`));
    } catch (error) {
      const errorMessage = `unable to delete blog created by ${blog.user.name}`;
      dispatch(displayError(errorMessage));
      console.error("unable to delete blog", error.message);
    }
  };

  const handleVote = async (event) => {
    event.preventDefault();
    await dispatch(voteFor(blog));
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
            likes {blog.likes} <button onClick={handleVote}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {canDeleteBlog && <button onClick={handleDelete}>remove</button>}
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  canDeleteBlog: PropTypes.bool.isRequired,
};

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(({ blogs }) => blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  return (
    <>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes) // sort desc. by likes
        .map((blog) => (
          <Blog key={blog.id} blog={blog} canDeleteBlog={true} />
        ))}
    </>
  );
};

export default BlogList;
