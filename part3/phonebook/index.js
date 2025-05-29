const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

PORT = process.env.PORT || 3001

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

const generateId = () => {
  return Math.floor(Math.random() * (1 << 30))
}

app.get('/info', (request, response) => {
  const requestTime = new Date(Date.now()).toString()
  response.send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${requestTime}</p>
  `)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const note = persons.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  const person = request.body
  if (!person.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  } else if (!person.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  } else if (persons.find(note => note.name == person.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  // newPerson.id = generateId()
  const newPerson = { ...person, id: generateId() }
  persons = persons.concat(newPerson)
  response.json(newPerson)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(note => note.id !== id)
  response.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})

// Logging functionality - using morgan
morgan.token('req-body', (req, _) => {
  if (req.method && req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ""
})