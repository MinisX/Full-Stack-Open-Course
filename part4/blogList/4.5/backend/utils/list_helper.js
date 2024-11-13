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

module.exports = {
  dummy, totalLikes, favouriteBlog
}