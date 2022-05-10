const dummy = (blogs) => {
	// ...
	return 1
}

const totalLikes = (blogs) =>
	blogs.reduce((sum, blog) =>
		sum + blog.likes
		, 0)

const favoriteBlog = (blogs) =>
	blogs.reduce((favorite, blog) =>
		favorite.likes > blog.likes
			? favorite
			: {
				title: blog.title,
				author: blog.author,
				likes: blog.likes
			}
		, {
			title: "No blogs were found",
			author: "No authors were found",
			likes: 0
		})

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}