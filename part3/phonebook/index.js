require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const apiURL = '/api/people'

morgan.token('post', (req) => {
	return JSON.stringify(req.body)
})
app.use(
	morgan('tiny', {
		skip: function (req) { return req.method === 'POST' }
	}))
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :post', {
		skip: function (req) { return req.method !== 'POST' }
	}))

app.get('/info', (request, response) => {
	Person.estimatedDocumentCount().then(
		numPeople => {
			response.send(`
				<h1>This is Phonebook project!</h1>
				<h2>Phonebook has an information about ${numPeople} people</h2>
				<p>${new Date}</p>
				<p><a href="/" >Phonebook</a></p>
				<p><a href="${apiURL}" >JSON API</a></p>
			`)
		})
})

app.get(apiURL, (request, response) => {
	Person.find({}).then(people => {
		response.json(people)
	})
})

app.get(`${apiURL}/:id`, (request, response, next) => {
	Person.findById(request.params.id)
		.then(person => {
			if (person) {
				response.json(person)
			} else {
				response.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.delete(`${apiURL}/:id`, (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(() =>
			response.status(204).end()
		)
		.catch(error => next(error))
})

app.post(apiURL, (request, response, next) => {
	const body = request.body

	if (!body.name) {
		return response.status(400).json({
			error: 'Name is missing'
		})
	}
	if (!body.number) {
		return response.status(400).json({
			error: 'Number is missing'
		})
	}

	const person = new Person({
		name: body.name,
		number: body.number
	})

	person.save()
		.then(savedPerson => {
			response.json(savedPerson)
		})
		.catch(error => next(error))
})

app.put(`${apiURL}/:id`, (request, response, next) => {
	const { name, number } = request.body

	Person.findByIdAndUpdate(
		request.params.id,
		{ name, number },
		{ new: true/*, runValidators: true, context: 'query'*/ }
	)
		.then(updatedPerson => {
			response.json(updatedPerson)
		})
		.catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
	response
		.status(404)
		.send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	console.error(error.message)
	// console.error(error.name)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}

	if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () =>
	console.log(`Server running on port ${PORT}!`)
)