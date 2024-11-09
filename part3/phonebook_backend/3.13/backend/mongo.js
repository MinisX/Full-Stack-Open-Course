const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

// MongoDB/mongoose configurations
const url = `mongodb+srv://minisx:${password}@cluster0.0fsaa.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery',false)
mongoose.connect(url)
// The schema tells Mongoose how the note objects are to be stored in the database
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
/*
    In the Note model definition, the first "Note" parameter is the singular name of the model. 
    The name of the collection will be the lowercase plural notes, because the Mongoose convention is to automatically name 
    collections as the plural (e.g. notes) when the schema refers to them in the singular (e.g. Note)

    The idea behind Mongoose is that the data stored in the database is given a schema at the level of 
    the application that defines the shape of the documents stored in any given collection.

    Models are constructor functions that create new JavaScript objects based on the provided parameters. Since the objects are created with the model's constructor function, 
    they have all the properties of the model, which include methods for saving the object to the database.

    If you define a model with the name Person, mongoose will automatically name the associated collection as people.
*/
const Person = mongoose.model('Person', personSchema)

// helper "functions"
const persistNewPerson = ((newPerson) => {
    newPerson.save().then(result =>{
        console.log('person saved!')
        console.log(result)
        mongoose.connection.close()
    })
  })

const printAllPersons = (() => {
    // what goes inside {} is a filter. Leave it empty as {} to get everything
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })
  })

  // process the input
  if (process.argv.length == 5) {
    const newPerson = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    persistNewPerson(newPerson)
  }else{
    printAllPersons()
  }