import { render, screen } from "@testing-library/react";
import { test, describe, vi, expect } from "vitest";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

describe("<BlogForm/ >", () => {
  const tryCreateBlog = vi.fn();

  test("calls `tryCreateBlog` with right parameters", async () => {
    const { container } = render(<BlogForm tryCreateBlog={tryCreateBlog} />);

    const user = userEvent.setup();

    const blog = {
      title: "title",
      author: "author",
      url: "url",
      likes: 42,
      user: { name: "user name" },
    };

    const titleInput = container.querySelector("#title-input");
    const authorInput = container.querySelector("#author-input");
    const urlInput = container.querySelector("#url-input");
    expect(titleInput).toBeDefined();
    expect(authorInput).toBeDefined();
    expect(urlInput).toBeDefined();

    await user.type(titleInput, blog.title);
    await user.type(authorInput, blog.author);
    await user.type(urlInput, blog.url);

    const formSubmitButton = screen.getByText("create");
    await user.click(formSubmitButton);
    expect(tryCreateBlog.mock.calls).toHaveLength(1);
    expect(tryCreateBlog.mock.lastCall[0].title).toBe(blog.title);
    expect(tryCreateBlog.mock.lastCall[0].author).toBe(blog.author);
    expect(tryCreateBlog.mock.lastCall[0].url).toBe(blog.url);
  });
});
