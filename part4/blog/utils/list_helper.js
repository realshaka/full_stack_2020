const { count } = require("../models/blog")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.map(blog => sum += blog.likes)
  return sum
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce(function (prev, current) {
    return (prev.likes > current.likes) ? prev : current
  })
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  }
}

const mostBlogs = (blogs) => {
  let counts = {}
  blogs.forEach(function (x) { counts[x.author] = (counts[x.author] || 0) + 1 })
  const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1])
  return {
    author: sortedCounts[0][0],
    blogs: sortedCounts[0][1]
  }
}

const mostLikes = (blogs) => {
  let result = [...blogs.reduce((r, o) => {
    const key = o.author

    const item = r.get(key) || Object.assign({}, o, {
      likes: 0,
    })

    item.likes += o.likes
    return r.set(key, item)
  }, new Map).values()]
  result = result.sort((a, b) => b.likes - a.likes )
  return {
    author: result[0].author,
    likes: result[0].likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}