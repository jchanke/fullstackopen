const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'all about turing machines',
    author: 'Alan Turing',
    url: '/all-about-turing-machines.html',
    likes: 42,
  },
  {
    title: 'lambda go brrr',
    author: 'Alonzo Church',
    url: '/lambda-go-brrr.html',
    likes: 101,
  }
]

const initialUsers = [
  {
    username: 'aturing',
    name: 'Alan Turing',
    password: 'aturing',
  },
  {
    username: 'achurch',
    name: 'Alonzo Church',
    password: 'achurch',
  },
  {
    username: 'srabin',
    name: 'Scott Rabin',
    password: 'srabin',
  },
  {
    username: 'hwang',
    name: 'Wang Hao',
    password: 'hwang',
  },

]

const nonExistingBlog = async () => {
  const user = await User.findOne()

  const blog = new Blog({
    title: 'will remove soon',
    author: 'anonymous',
    url: 'somewhere.html',
    user: user._id
  })
  await blog.save()
  await blog.deleteOne()
  return blog
}

const nonExistingUser = async () => {
  const user = User({
    username: 'will delete soon',
    name: 'Just Passing',
    passwordHash: 'somehash',
  })
  await user.save()
  await user.deleteOne()
  return user
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, nonExistingBlog, blogsInDb,
  initialUsers, nonExistingUser, usersInDb,
}
