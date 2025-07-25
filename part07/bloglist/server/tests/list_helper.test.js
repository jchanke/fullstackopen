const { test, describe } = require("node:test");
const assert = require("node:assert");

const _ = require("lodash");
const listHelper = require("../utils/list_helper");

const emptyBlogList = [];

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
    __v: 0,
  },
];

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

describe("dummy", () => {
  test("dummy returns one", () => {
    assert.strictEqual(1, listHelper.dummy(emptyBlogList));
  });
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    assert.strictEqual(0, listHelper.totalLikes(emptyBlogList));
  });

  test("when list has only one blog, equals the likes of that", () => {
    const [blog] = listWithOneBlog;
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), blog.likes);
  });

  test("of a bigger list is calculated right", () => {
    let totalLikes = 0;
    blogs.forEach((blog) => {
      totalLikes += blog.likes;
    });
    assert.strictEqual(listHelper.totalLikes(blogs), totalLikes);
  });
});

describe("favorite blog", () => {
  test("of empty list is null", () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(emptyBlogList), null);
  });

  test("when list has only one blog, equals that", () => {
    const [blog] = listWithOneBlog;
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithOneBlog), blog);
  });

  test("is calculated right for a bigger list", () => {
    blogs.sort((a, b) => b.likes - a.likes);
    const favoriteBlog = blogs[0];
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), favoriteBlog);
  });
});

describe("author with most blogs", () => {
  test("of empty list is null", () => {
    assert.deepStrictEqual(listHelper.mostBlogs(emptyBlogList), null);
  });

  test("when list has only one blog, equals that author", () => {
    const [blog] = listWithOneBlog;
    assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), {
      author: blog.author,
      blogs: 1,
    });
  });

  test("is calculated right for a bigger list", () => {
    const authorCounts = _.countBy(blogs, (blog) => blog.author);
    const { author } = listHelper.mostBlogs(blogs);
    for (let a in authorCounts) {
      assert(authorCounts[author] >= authorCounts[a]);
    }
  });
});
