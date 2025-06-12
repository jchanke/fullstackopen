import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ tryCreateBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateBlogSubmit = (event) => {
    event.preventDefault();

    const createBlogSuccess = tryCreateBlog({ title, author, url });
    if (createBlogSuccess) {
      setTitle("");
      setAuthor("");
      setUrl("");
    }
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
  tryCreateBlog: PropTypes.func.isRequired,
};

export default BlogForm;
