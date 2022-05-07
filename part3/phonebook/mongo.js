/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('Please provide the password as an argument: node mongo.js <password>')
	process.exit(1)
}

const password = process.argv[2]

const url =
	`mongodb+srv://fullstackopen-sfilimonov:${password}@cluster0.ktjpq.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
	// id: Number,
})

// ID generation is unnecessary because mongo's client generates it automatically
// const generateId = ({ min = 0, max = 10000000000 } = {}) => {
// 	min = Math.ceil(min)
// 	max = Math.floor(max)
// 	const id = Math.floor(Math.random() * (max - min) + min)
// 	return id //The maximum is exclusive and the minimum is inclusive
// }

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 4) {
	console.log('phonebook:')
	Person.find({}).then(result => {
		result.forEach(person => {
			console.log(person.name, person.number ? person.number : '')
		})
		mongoose.connection.close()
	})
}

if (process.argv.length >= 4) {
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4],
		// id: generateId(),
	})

	person.save().then(() => {
		console.log('Person saved!')
		mongoose.connection.close()
	})
}