const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let totalSumOfLikes = 0
  blogs.forEach(blog => {
    totalSumOfLikes += blog.likes
  })

  return totalSumOfLikes
}

const favouriteBlog = (blogs) => {
  let favouriteBlog = blogs.length > 0 ? blogs[0] : undefined
  blogs.forEach(blog => {
    if(blog.likes > favouriteBlog.likes)
      favouriteBlog = blog
  })

  return favouriteBlog
}

const mostBlogs = (blogs) => {
  const authorCounts = _.countBy(blogs, 'author')
  const topAuthor = _.maxBy(Object.keys(authorCounts), author => authorCounts[author])
  return topAuthor ? { author: topAuthor, blogs: authorCounts[topAuthor] } : undefined
}

const mostLikes = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, 'author');
  const likesByAuthor = _.mapValues(blogsByAuthor, (authorBlogs) => {
    return _.sumBy(authorBlogs, 'likes')
  })
  const topAuthor = _.maxBy(Object.keys(likesByAuthor), (author) => likesByAuthor[author])
  return topAuthor ? { author: topAuthor, likes: likesByAuthor[topAuthor] } : undefined
}

module.exports = {
  dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}