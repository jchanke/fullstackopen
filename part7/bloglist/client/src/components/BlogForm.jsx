import { useState } from "react";
import PropTypes from "prop-types";
import { useCreateBlog } from "../queries/blogs";
import { useNotification } from "../contexts/NotificationContext";
import { Button, Field, Fieldset, Input, Stack } from "@chakra-ui/react";

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
      <form onSubmit={handleCreateBlogSubmit}>
        <Fieldset.Root size="lg" maxWidth="md">
          <Stack>
            <Fieldset.Legend>create new blog</Fieldset.Legend>
            <Fieldset.HelperText>enter new blog details</Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            <Stack gap="4" align="flex-start" maxWidth="sm">
              <Field.Root>
                <Field.Label>title</Field.Label>
                <Input
                  name="title"
                  id="title-input"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>author</Field.Label>
                <Input
                  name="author"
                  id="author-input"
                  value={author}
                  onChange={(event) => setAuthor(event.target.value)}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>url</Field.Label>
                <Input
                  name="url"
                  id="url-input"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                />
              </Field.Root>
              <Button type="submit">create</Button>
            </Stack>
          </Fieldset.Content>
        </Fieldset.Root>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
};

export default BlogForm;
