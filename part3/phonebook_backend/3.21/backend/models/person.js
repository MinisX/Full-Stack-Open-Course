const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

    // The schema tells Mongoose how the note objects are to be stored in the database
const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minLength: 3,
      required: true
    },
    number: {
      type: String,
      minLength: 8,
      required: [true, 'User phone number required'],
      validate: {
        validator: function(v) {
          return /\d{2,3}-\d{5,}/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
    }
  })
  /*
  The application works almost perfectly. The frontend assumes that every object has a unique id in the id (_id) field. 
  We also don't want to return the mongo versioning field __v to the frontend.

  One way to format the objects returned by Mongoose is to modify the toJSON method of the schema, 
  which is used on all instances of the models produced with that schema.

  Even though the _id property of Mongoose objects looks like a string, it is in fact an object. 
  The toJSON method we defined transforms it into a string just to be safe. If we didn't make this change, 
  it would cause more harm to us in the future once we start writing tests.

  The code automatically uses the defined toJSON when formatting notes to the response.
*/
  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  module.exports = mongoose.model('Person', personSchema)