import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { displayInfo, displayError } from "../reducers/notificationReducer";
import { deleteBlogById, fetchBlogs, voteFor } from "../reducers/blogsReducer";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  return (
    <>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes) // sort desc. by likes
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </>
  );
};

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleIsExpanded = () => setIsExpanded(!isExpanded);

  const canDeleteBlog = blog.user.username === user.username;

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
      const errorMessage = `unable to delete blog created by ${blog.user.name}, ${error.message}`;
      dispatch(displayError(errorMessage));
    }
  };

  const handleVote = async (event) => {
    event.preventDefault();
    dispatch(voteFor(blog));
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
};

export default BlogList;
