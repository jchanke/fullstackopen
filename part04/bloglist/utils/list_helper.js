const _ = require('lodash')

const dummy = (_blogs) => 1

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const maxReducer = (currentFavorite, blog) => {
    if (!currentFavorite || blog.likes > currentFavorite.likes) {
      return blog
    }
    return currentFavorite
  }
  return blogs.reduce(maxReducer, null)
}

const mostBlogs = (blogs) => {
  const authorCounts = Object.entries(_.countBy(blogs, blog => blog.author))
  const maxReducer = (curr, author) => {
    if (!curr || author[1] > curr.blogs) {
      return {
        author: author[0],
        blogs: author[1]
      }
    }
    return curr
  }
  return authorCounts.reduce(maxReducer, null)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}