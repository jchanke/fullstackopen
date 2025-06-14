import { useState } from "react";
import PropTypes from "prop-types";
import { useCreateBlog } from "../queries/blogs";
import { useNotification } from "../contexts/NotificationContext";

const BlogForm = ({ toggleVisibility }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const notification = useNotification();
  const createBlog = useCreateBlog();

  const handleCreateBlogSubmit = (event) => {
    event.preventDefault();
    try {
      createBlog.mutate({ title, author, url });
    } catch (error) {
      notification.error("unable to create blog");
      console.error("unable to create blog:", error.message);
      return;
    }
    notification.info(`a new blog ${title} by ${author} added`);
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
