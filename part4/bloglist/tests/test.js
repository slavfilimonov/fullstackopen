const listHelper = require('../utils/list_helper')
const { listWithNoBlogs, listWithOneBlog, listWithSixBlogs } = require('./initial_list')


test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('total likes', () => {

	test('of empty list is zero', () => {
		const result = listHelper.totalLikes(listWithNoBlogs)
		expect(result).toBe(0)
	})

	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.totalLikes(listWithOneBlog)
		expect(result).toBe(5)
	})

	test('of a bigger list is calculated right', () => {
		const result = listHelper.totalLikes(listWithSixBlogs)
		expect(result).toBe(36)
	})

})

describe('blog with most likes', () => {

	test('of empty list', () => {
		const result = listHelper.favoriteBlog(listWithNoBlogs)
		expect(result).toEqual({
			title: "No blogs were found",
			author: "No authors were found",
			likes: 0
		})
	})

	test('when list has only one blog', () => {
		const result = listHelper.favoriteBlog(listWithOneBlog)
		expect(result).toEqual({
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			likes: 5
		})
	})

	test('of a bigger list', () => {
		const result = listHelper.favoriteBlog(listWithSixBlogs)
		expect(result).toEqual({
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			likes: 12,
		})
	})

})

describe('author with most blogs', () => {
	test('of empty list', () => {
		const result = listHelper.mostBlogs(listWithNoBlogs)
		expect(result).toEqual('No blogs were found')
	})

	test('of the only blog', () => {
		const result = listHelper.mostBlogs(listWithOneBlog)
		expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
	})

	test('of a bigger list', () => {
		const result = listHelper.mostBlogs(listWithSixBlogs)
		expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
	})
})

describe('author with most likes', () => {
	test('of empty list', () => {
		const result = listHelper.mostLikes(listWithNoBlogs)
		expect(result).toEqual('No blogs were found')
	})

	test('of the only blog', () => {
		const result = listHelper.mostLikes(listWithOneBlog)
		expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 })
	})

	test('of a bigger list', () => {
		const result = listHelper.mostLikes(listWithSixBlogs)
		expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
	})
})