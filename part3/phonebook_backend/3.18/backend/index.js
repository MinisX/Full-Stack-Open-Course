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

// REST endpoints
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons=> {
    response.json(persons)
  })
})

app.get('/info', (request, response, next) => {
  Person.find({})
  .then(persons => {
    response.send(`Phonebook has info for ${persons.length} people <br/> ${new Date().toString()}`)
  })
  .catch(error => next(error))
})

app.get('/api/persons/:id', (request,response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    response.json(person)
  })
  .catch(error =>next(error))
})

app.delete('/api/persons/:id', (request,response,next) => {
  Person.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.post('/api/persons', (request,response,next) => {
  const body = request.body

  if(!body.name || !body.number){
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  }

  Person.find({})
  .then(persons => {
    if(persons.find(person => person.name === body.name)){
      return response.status(409).json({
        error: 'name must be unique'
      })
    }else{
      const newPerson = new Person({
        ...body
      })

      newPerson.save()
      .then(savedPerson => {
        response.status(201).json(newPerson)
      })
      .catch(error => next(error))
    }
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  // [options.new=false] «Boolean» if true, return the modified document rather than the origina
  Person.findByIdAndUpdate(request.params.id, request.body, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

/*
  The error handler checks if the error is a CastError exception, in which case we know that the error was caused 
  by an invalid object id for Mongo. In this situation, the error handler will send a response to the browser with the response object 
  passed as a parameter. In all other error situations, the middleware passes the error forward to the default Express error handler.
*/
const errorHandler = (error, request, response, next) => {
  console.log("error handler")
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

// server configuration
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})