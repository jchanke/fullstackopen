import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, Stack, Table } from "@chakra-ui/react";

import { useBlogs, useDeleteBlog, useLikeBlog } from "../queries/blogs";
import { useNotification } from "../contexts/NotificationContext";
import { useCurrentUser } from "../contexts/UserContext";

const BlogList = () => {
  const blogsQuery = useBlogs();

  if (blogsQuery.isError) return `Error: ${blogsQuery.error}`;
  if (blogsQuery.isPending) return "Loading blogs...";

  const blogs = blogsQuery.data;

  return (
    <Table.Root size="lg">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Blog</Table.ColumnHeader>
          <Table.ColumnHeader />
          <Table.ColumnHeader>Author</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {blogs.map((blog) => (
          <BlogListing key={blog.id} blog={blog} />
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export const BlogListing = ({ blog }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { user } = useCurrentUser();
  const notification = useNotification();

  const likeBlog = useLikeBlog();
  const deleteBlog = useDeleteBlog();

  const canDeleteBlog = user.username === blog.user.username;

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
    <Table.Row>
      <Table.Cell>
        <Stack>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          {isExpanded && (
            <>
              <div>{blog.url}</div>
              <div>
                likes {blog.likes}{" "}
                <Button onClick={handleLike} size="xs">
                  like
                </Button>
              </div>
              <div>{blog.user.name}</div>
              {canDeleteBlog && <button onClick={handleDelete}>remove</button>}
            </>
          )}
        </Stack>
      </Table.Cell>
      <Table.Cell>
        <button onClick={toggleIsExpanded}>
          {isExpanded ? "hide" : "view"}
        </button>
      </Table.Cell>
      <Table.Cell>{blog.author}</Table.Cell>
    </Table.Row>
  );
};

BlogListing.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default BlogList;
