const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')

// To access the json data easily from the request (e.g for adding new persons), we need the help of the Express json-parser
app.use(express.json())

// allow for requests from all origins
app.use(cors())

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
    response.json(persons)
})

app.get('/info', (request, response) => {
  response.send(`Phonebook has info for ${persons.length} people <br/> ${new Date().toString()}`)
})

app.get('/api/persons/:id', (request,response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if(person){
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request,response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request,response) => {
  const body = request.body

  if(!body.name || !body.number){
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  }

  if(persons.find(person => person.name === body.name)){
    return response.status(409).json({
      error: 'name must be unique'
    })
  }

  const newPerson = {
    "id" : generateNewId().toString(),
    ...body
  }

  persons = persons.concat(newPerson)
  response.status(201).json(newPerson)
})

// server configuration
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})