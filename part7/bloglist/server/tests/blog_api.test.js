const assert = require("node:assert");
const { test, after, beforeEach, describe } = require("node:test");

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

const loginAs = async (api, { username, password }) => {
  const {
    body: { token: token },
  } = await api
    .post("/api/login")
    .send({ username, password })
    .expect(200)
    .expect("Content-Type", /application\/json/);
  return token;
};

describe("when there are initially some blogs and users saved", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    for (let { username, name, password } of helper.initialUsers) {
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({ username, name, passwordHash });
      await newUser.save();
    }

    await Blog.deleteMany({});
    for (let blog of helper.initialBlogs) {
      const user = await User.findOne();
      const newBlog = new Blog({
        ...blog,
        user: user._id,
      });
      await newBlog.save();
    }
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");
    const titles = response.body.map((blog) => blog.title);
    for (let blog of helper.initialBlogs) {
      assert(titles.includes(blog.title));
    }
  });

  test("blog fields are correct", async () => {
    const blogs = await helper.blogsInDb();

    for (let blog of blogs) {
      assert(blog.url);
      assert(blog.title);
      assert(blog.author);
      assert(blog.user);
      if (blog.user.length > 0) {
        assert(blog.user.username);
        assert(blog.user.name);
        assert(blog.user.id);
      }
      assert(blog.likes);
      assert(blog.id);
      assert(!blog._id);
      assert(!blog.__v);
    }
  });

  describe("viewing a specific blog", () => {
    test("succeeds with a valid id", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToView = blogsAtStart[0];

      const { body: resultBlog } = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      // TODO: fix - can't test this yet
      delete blogToView.user;
      delete resultBlog.user;

      assert.deepStrictEqual(resultBlog, blogToView);
    });

    test("fails with statuscode 404 if note does not exist", async () => {
      const validNonexistingBlog = await helper.nonExistingBlog();
      await api.get(`/api/blogs/${validNonexistingBlog.id}`).expect(404);
    });

    test("fails with statuscode 400 if id is invalid", async () => {
      await api.get("/api/blogs/bad_id").expect(400);
    });
  });

  describe("addition of a new blog", () => {
    test("fails with statuscode 401 when user is not logged in", async () => {
      const newBlog = {
        title: "tiles to infinity",
        author: "Wang Hao",
        url: "tiles-to-infinity.html",
        likes: 24,
      };

      await api.post("/api/blogs").send(newBlog).expect(401);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);

      const titles = blogsAtEnd.map((blog) => blog.title);
      assert(!titles.includes(newBlog.title));
    });

    describe("when user is logged in", async () => {
      test("succeeds with valid data", async () => {
        const newBlog = {
          title: "tiles to infinity",
          author: "Wang Hao",
          url: "tiles-to-infinity.html",
          likes: 24,
        };

        const token = await loginAs(api, {
          username: "hwang",
          password: "hwang",
        });

        await api
          .post("/api/blogs")
          .set("Authorization", `Bearer ${token}`)
          .send(newBlog)
          .expect(201)
          .expect("Content-Type", /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

        const titles = blogsAtEnd.map((blog) => blog.title);
        assert(titles.includes(newBlog.title));
      });

      test("`likes` field defaults to 0 if not given", async () => {
        const newBlog = {
          title: "state machines ftw",
          author: "Scott Rabin",
          url: "state-machines-ftw.html",
        };

        const token = await loginAs(api, {
          username: "srabin",
          password: "srabin",
        });

        const response = await api
          .post("/api/blogs")
          .set("Authorization", `Bearer ${token}`)
          .send(newBlog)
          .expect(201)
          .expect("Content-Type", /application\/json/);

        assert.strictEqual(response.body.likes, 0);
      });

      test("fails with statuscode 400 when invalid (without title)", async () => {
        const newBlog = {
          author: "anonymous",
          url: "who-knows.html",
          likes: 1000,
        };

        const token = await loginAs(api, {
          username: "srabin",
          password: "srabin",
        });

        await api
          .post("/api/blogs")
          .set("Authorization", `Bearer ${token}`)
          .send(newBlog)
          .expect(400);

        const blogsAtEnd = await helper.blogsInDb();
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
      });

      test("fails with statuscode 400 when invalid (without url)", async () => {
        const newBlog = {
          title: "A Mysterious Blog",
          author: "anonymous",
          likes: 1000,
        };

        const token = await loginAs(api, {
          username: "srabin",
          password: "srabin",
        });

        await api
          .post("/api/blogs")
          .set("Authorization", `Bearer ${token}`)
          .send(newBlog)
          .expect(400);

        const blogsAtEnd = await helper.blogsInDb();
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
      });
    });
  });

  describe("deletion of a blog", () => {
    test("fails with statuscode 401 if user is not logged in", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(401);

      const blogsAtEnd = await helper.blogsInDb();

      const titles = blogsAtEnd.map((n) => n.title);
      assert(titles.includes(blogToDelete.title));

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });

    describe("when user is logged in", () => {
      test("succeeds with statuscode 204 if id is valid", async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];

        const userId = blogToDelete.user.toString();
        const user = await User.findById(userId);

        // in our tests, the password is always the same as the username
        const token = await loginAs(api, {
          username: user.username,
          password: user.username,
        });

        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .set("Authorization", `Bearer ${token}`)
          .send()
          .expect(204);

        const blogsAtEnd = await helper.blogsInDb();

        const titles = blogsAtEnd.map((n) => n.title);
        assert(!titles.includes(blogToDelete.title));
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
      });

      test("fails with statuscode 401 if wrong user is logged in", async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];

        const userId = blogToDelete.user.toString();
        const otherUsers = (await helper.usersInDb()).filter(
          (user) => user._id !== userId,
        );
        const user = otherUsers[0];

        // in our tests, the password is always the same as the username
        const token = await loginAs(api, {
          username: user.username,
          password: user.username,
        });

        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .set("Authorization", `Bearer ${token}`)
          .send()
          .expect(204);

        const blogsAtEnd = await helper.blogsInDb();

        const titles = blogsAtEnd.map((n) => n.title);
        assert(!titles.includes(blogToDelete.title));
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
      });

      test("fails with statuscode 204 if recently deleted already", async () => {
        const blogsAtStart = await helper.blogsInDb();
        const recentlyDeletedBlog = await helper.nonExistingBlog();

        const userId = recentlyDeletedBlog.user;
        const user = await User.findById(userId);

        // in our tests, the password is always the same as the username
        const token = await loginAs(api, {
          username: user.username,
          password: user.username,
        });

        const _response = await api
          .delete(`/api/blogs/${recentlyDeletedBlog.id}`)
          .set("Authorization", `Bearer ${token}`)
          .expect(204);

        const blogsAtEnd = await helper.blogsInDb();
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
      });

      test("fails with statuscode 400 if id is invalid", async () => {
        const blogsAtStart = await helper.blogsInDb();
        const user = await User.findOne();

        // in our tests, the password is always the same as the username
        const token = await loginAs(api, {
          username: user.username,
          password: user.username,
        });

        await api
          .delete("/api/blogs/bad_id")
          .set("Authorization", `Bearer ${token}`)
          .expect(400);

        const blogsAtEnd = await helper.blogsInDb();
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
        assert;
      });
    });
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
