import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { createBlog } from "../reducers/blogsReducer";
import { displayInfo, displayError } from "../reducers/notificationReducer";

const BlogForm = ({ toggleVisibility }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const handleCreateBlogSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(createBlog({ title, author, url }));
    } catch (error) {
      dispatch(displayError("unable to create blog"));
      console.error("unable to create blog:", error.message);
      return;
    }
    dispatch(displayInfo(`a new blog ${title} by ${author} added`));
    toggleVisibility();
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlogSubmit}>
        <div>
          title:
          <input
            name="title"
            id="title-input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author:
          <input
            name="author"
            id="author-input"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url:
          <input
            name="url"
            id="url-input"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
};

export default BlogForm;
