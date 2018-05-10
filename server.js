const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const person_routes = require('./routes/person.routes')
const auth_routes = require('./routes/authentication.routes')
// const List = require('./model/List')
const AuthController = require('./controllers/authentication.controller')
const ApiError = require('./model/ApiError')
const settings = require('./config/config')

//Verkrijg de poort van de omgevingsvariabele (Heroku ondersteund dit), anders van de Config file
const port = process.env.PORT || settings.webPort

//Express laden
let app = express()

// bodyParser parses the body from a request
app.use(bodyParser.json())

// Instal Morgan as logger
app.use(morgan('dev'))

// Preprocessing catch-all endpoint
// The perfect place to check that the user performing the request 
// has authorisation to do things on our server
app.use('*', function(req, res, next){
	next()
})

// Unprotected routes - no token required.
// Provides login and registration 
app.use('/api', auth_routes)

// On all other routes, check for API key
// app.all('*', (req, res, next) => { });
app.all('*', AuthController.validateToken);

// Regular endpoints
app.use('/api', person_routes)

// Postprocessing; catch all non-existing endpoint requests
app.use('*', function (req, res, next) {
	// console.log('Non-existing endpoint')
	const error = new ApiError("Deze endpoint bestaat niet", 404)
	next(error)
})

// Catch-all error handler according to Express documentation - err should always be an ApiError! 
// See also http://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
	// console.dir(err)
	res.status((err.code || 404)).json(err).end()	
})

// Start listening for incoming requests.
app.listen(port, () => {
	console.log('Server running on port ' + port)
})

// Testcases need our app - export it.
module.exports = app