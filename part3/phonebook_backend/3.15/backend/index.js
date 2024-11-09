const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

// To access the json data easily from the request (e.g for adding new persons), we need the help of the Express json-parser
app.use(express.json())

// allow for requests from all origins
app.use(cors())

// To make Express show static content, the page index.html and the JavaScript, etc., it fetches, we need a built-in middleware from Express called static
app.use(express.static('dist'))

// Create a custom Morgan token to log the request body
morgan.token('body', (req) => JSON.stringify(req.body));

// Use Morgan middleware with a custom format to include the body for POST requests
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// data
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// helper methods
const generateNewId = () => {
  let randomId = 1
  while(persons.find(person => person.id === randomId.toString())){
    randomId = Math.floor(Math.random() * 10000)
  }
  
  return randomId;
}

// REST endpoints
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons=> {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  Person.find({})
  .then(persons => {
    response.send(`Phonebook has info for ${persons.length} people <br/> ${new Date().toString()}`)
  }).catch(error => {
    response.send(`Phonebook has info for 0 people <br/> ${new Date().toString()}`)
  })
})

app.get('/api/persons/:id', (request,response) => {
  Person.findById(request.params.id)
  .then(person => {
    response.json(person)
  }).catch(error =>{
    response.status(404).end()
  })
})

app.delete('/api/persons/:id', (request,response) => {
  Person.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => response.status(204).end())
})

app.post('/api/persons', (request,response) => {
  const body = request.body

  if(!body.name || !body.number){
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  }

  Person.find({}).then(persons => {
    if(persons.find(person => person.name === body.name)){
      return response.status(409).json({
        error: 'name must be unique'
      })
    }else{
      const newPerson = new Person({
        ...body
      })

      newPerson.save().then(savedPerson => {
        response.status(201).json(newPerson)
      })
    }
  })
})

// server configuration
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})