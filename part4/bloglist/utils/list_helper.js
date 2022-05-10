const _ = require('lodash')

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
			title: 'No blogs were found',
			author: 'No authors were found',
			likes: 0
		})

const mostBlogs = (blogs) => {
	if (blogs.length === 0) return 'No blogs were found'

	const authorMostBlogs = _
		.chain(blogs)
		.countBy(blog => blog.author)
		.toPairs()
		.maxBy(pair => pair[1])
		.value()

	return {
		author: authorMostBlogs[0],
		blogs: authorMostBlogs[1]
	}
}

const mostLikes = (blogs) => {
	if (blogs.length === 0) return 'No blogs were found'

	const authorMostLikes = _
		.chain(blogs)
		.groupBy(blog => blog.author)
		.toPairs()
		.map(author => [author[0], _.sumBy(author[1], blog => blog.likes)])
		.maxBy(pair => pair[1])
		.value()

	return {
		author: authorMostLikes[0],
		likes: authorMostLikes[1]
	}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}