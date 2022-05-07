const mongoose = require('mongoose')

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI

mongoose.connect(url)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: [3, 'Name\'s length must be more than 2 symbols'],
		required: true
	},
	number: {
		type: String,
		validate: {
			validator: function (v) {
				//number is adapted to Russian format and deviates from a task on purpose
				return /\d{3}-\d{3}-\d{4}/.test(v)
			},
			message: props => `${props.value} is not a valid phone number!`
		},
	},
})

personSchema.set('toJSON', {
	transform: (_document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', personSchema)