//
// Authentication routes
//
const routes = require('express').Router();
const AuthController = require('../controllers/authentication.controller')

// The router endpoints that we provide
routes.post('/login', AuthController.login)
routes.post('/register', AuthController.register)

module.exports = routes
