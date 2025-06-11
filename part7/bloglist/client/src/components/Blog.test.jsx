import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  const blog = {
    title: "title should display",
    author: "author should display",
    url: "url should be hidden",
    likes: 0, // likes should be hidden
    user: { name: "user name should be hidden" },
  };

  const incrLikes = vi.fn();
  const deleteBlog = vi.fn();

  test("renders title and author by default", () => {
    render(<Blog blog={blog} incrLikes={incrLikes} deleteBlog={deleteBlog} />);

    expect(screen.queryByText(`${blog.title}`)).toBeDefined();
    expect(screen.queryByText(`${blog.author}`)).toBeDefined();
    expect(screen.queryByText(`${blog.url}`)).toBeNull();
    expect(screen.queryByText(`likes ${blog.likes}`)).toBeNull();
  });

  test('shows url and likes when "view" button is clicked', async () => {
    render(<Blog blog={blog} incrLikes={incrLikes} deleteBlog={deleteBlog} />);

    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    expect(screen.queryByText(`${blog.url}`)).toBeDefined();
    expect(screen.queryByText(`likes ${blog.likes}`)).toBeDefined();
    expect(screen.queryByText(`${blog.user.name}`)).toBeDefined();
  });

  test('calls setBlogs when "like" button is clicked', async () => {
    render(<Blog blog={blog} incrLikes={incrLikes} deleteBlog={deleteBlog} />);

    const user = userEvent.setup();

    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);
    expect(deleteBlog).not.toHaveBeenCalled();
    expect(incrLikes.mock.calls).toHaveLength(2);
  });
});
