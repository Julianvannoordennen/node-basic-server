const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const person_routes = require('./routes/person_routes')

let app = express()

// bodyParser zorgt dat we de body uit een request kunnen gebruiken,
app.use(bodyParser.json());

// Installeer Morgan als logger
app.use(morgan('dev'));

app.use('*', function(req, res, next){
	next()
})

app.use('/api', person_routes)

app.get('/api/greeting', function (req, res, next) {
	let mygreeting = {
		text: "Hello all!",
		author: "Robin Schellius"
	}
	res.send(mygreeting)
})

// Wanneer we hier komen bestond de gevraagde endpoint niet
app.use('*', function (req, res, next) {
	console.log('De endpoint die je zocht bestaat niet')
	let message = {
		error: "Deze enpoint bestaat niet"
	}
	next(message)
})

// catch-all error handler volgens Express documentatie
// http://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
	console.log('Catch-all error handler was called.')
	console.log(err)

	res.status(404).json(err).end()	
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log('De server draait op port ' + port)
})

module.exports = app