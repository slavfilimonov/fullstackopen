const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('get', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are three blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(3)
  })

  test('id field is present', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
    expect(response.body[1].id).toBeDefined()
    expect(response.body[2].id).toBeDefined()
  })
})

describe('post', () => {
  test('correct post is possible to create', async () => {
    const newBlog = {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

    const { id, ...content } = response.body
      .find(blog =>
        blog.title === 'First class tests'
        && blog.author === 'Robert C. Martin'
      )
    expect(content).toEqual(newBlog)
  })
})

describe('post: some content is missing', () => {
  test('likes is 0 by default', async () => {
    const newBlog = {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html"
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

    const content = response.body
      .find(blog =>
        blog.title === 'First class tests'
        && blog.author === 'Robert C. Martin'
      )
    expect(content.likes).toEqual(0)
  })

  test('if title and url is empty, return 400', async () => {
    const newBlog = {
      author: "Robert C. Martin",
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

  })
})

describe('delete', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const blogs = blogsAtEnd.map(r => r.title)

    expect(blogs).not.toContain(blogToDelete.title)
  })
})

describe('put', () => {
  test('likes update succeeds with status code 200', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const likesAtStart = blogsAtStart[0].likes
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.likes++

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[0].likes).toEqual(
      likesAtStart + 1
    )
  })
})

afterAll(() => {
  mongoose.connection.close()
})