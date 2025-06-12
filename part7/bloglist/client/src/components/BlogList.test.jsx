import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<Blog />", () => {
  const blog = {
    title: "title should display",
    author: "author should display",
    url: "url should be hidden",
    likes: 0, // likes should be hidden
    user: { name: "user name should be hidden" },
  };

  const incrLikes = vi.fn();
  const tryDeleteBlog = vi.fn();

  test("renders title and author by default", () => {
    render(
      <Blog
        blog={blog}
        incrLikes={incrLikes}
        tryDeleteBlog={tryDeleteBlog}
        canDeleteBlog={false}
      />
    );

    expect(screen.queryByText(`${blog.title}`)).toBeDefined();
    expect(screen.queryByText(`${blog.author}`)).toBeDefined();
    expect(screen.queryByText(`${blog.url}`)).toBeNull();
    expect(screen.queryByText(`likes ${blog.likes}`)).toBeNull();
  });

  test('shows url and likes when "view" button is clicked', async () => {
    render(
      <Blog
        blog={blog}
        incrLikes={incrLikes}
        tryDeleteBlog={tryDeleteBlog}
        canDeleteBlog={false}
      />
    );

    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    expect(screen.queryByText(`${blog.url}`)).toBeDefined();
    expect(screen.queryByText(`likes ${blog.likes}`)).toBeDefined();
    expect(screen.queryByText(`${blog.user.name}`)).toBeDefined();
  });

  test('calls incrLikes when "like" button is clicked', async () => {
    render(
      <Blog
        blog={blog}
        incrLikes={incrLikes}
        tryDeleteBlog={tryDeleteBlog}
        canDeleteBlog={false}
      />
    );

    const user = userEvent.setup();

    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);
    expect(tryDeleteBlog).not.toHaveBeenCalled();
    expect(incrLikes.mock.calls).toHaveLength(2);
  });

  test("can't delete if `canDeleteBlog` is false`", async () => {
    render(
      <Blog
        blog={blog}
        incrLikes={incrLikes}
        tryDeleteBlog={tryDeleteBlog}
        canDeleteBlog={false}
      />
    );

    const user = userEvent.setup();
    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    const removeButton = screen.queryByText("remove");
    expect(removeButton).toBeNull();
  });

  test("remove button displayed if `canDeleteBlog` is true", async () => {
    render(
      <Blog
        blog={blog}
        incrLikes={incrLikes}
        tryDeleteBlog={tryDeleteBlog}
        canDeleteBlog={true}
      />
    );

    const user = userEvent.setup();
    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    const removeButton = screen.getByText("remove");
    await user.click(removeButton);
    expect(incrLikes).not.toHaveBeenCalled();
    expect(tryDeleteBlog.mock.calls).toHaveLength(1);
  });
});
