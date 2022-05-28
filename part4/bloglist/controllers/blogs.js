
const bloglistRouter = require('express').Router()
const Blog = require('../models/blog.js')

bloglistRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

bloglistRouter.post('/', async (request, response) => {
	if (!!request.body.likes === false) {
		request.body.likes = 0
	}

	const blog = new Blog(request.body)
	const savedBlog = await blog.save()

	response.status(201).json(savedBlog)
})

module.exports = bloglistRouter