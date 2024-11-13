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

module.exports = {
  dummy, totalLikes
}