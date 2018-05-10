//
// Person.routes.js
//
let routes = require('express').Router()
let personcontroller = require('../controllers/person.controller')

// hier schrijven we router endpoints
routes.get('/persons', personcontroller.getAllPersons)
routes.post('/persons', personcontroller.createPerson)

routes.get('/persons/:id', personcontroller.getPersonById)
routes.put('/persons/:id', personcontroller.updatePersonById)
routes.delete('/persons/:id', personcontroller.deletePersonById)

module.exports = routes
