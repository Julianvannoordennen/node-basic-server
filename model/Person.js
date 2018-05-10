//
// Person class
//
const assert = require('assert')
const ApiError = require('./ApiError')
const bcrypt = require('bcryptjs');

function validateEmail(email) {
    const validator = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validator.test(email);
}

// To verify that validateEmail works as expected:
// console.log('testing email: ' + validateEmail('test.server@test.com'))

class Person {

    constructor(firstname, lastname, email, password) {
        // Verify that we only create valid persons
        try {
            assert(typeof (firstname) === 'string', 'firstname must be a string')
            assert(typeof (lastname) === 'string', 'lastname must be a string')
            assert(typeof (email) === 'string', 'email must be a string')
            assert(typeof (password) === 'string', 'password must be a string')
            assert(firstname.trim().length > 2, 'firstname must be at least 3 characters')
            assert(lastname.trim().length > 2, 'lastname must be at least 3 characters')
            assert(validateEmail(email.trim()), 'email must be a valid emailaddress')
            assert(password.trim().length > 2, 'password must be at least 3 characters')
        }
        catch (ex) {
            throw(new ApiError(ex.toString(), 422))
        }
        
        this.name = {
            firstname: firstname.trim(),  // trim removes whitespace in front and at end
            lastname:  lastname.trim()
        }
        this.email = email.trim()
        // Encrypt the password - never store a password as plain text!
        // this.password = bcrypt.hashSync(password.trim(), 8); // Synchronous version
        bcrypt.hash(password.trim(), 8, (err, hash) => {    // Asynchronous version
            if(err) throw(new ApiError(err.toString(), 500))
            if(hash) this.password = hash
        })
    }

    getFirstname(){
        return this.name.firstname
    }

    getLastname(){
        return this.name.lastname
    }

    getEmail(){
        return this.email
    }

    // Other class functions here
}

/**
 * Override the toString method. Make a copy of the current object and 
 * delete the password from it, to avoid sending the password to the caller.
 * This only works when calling console.log(person.toString())! 
 * Using console.log(person) will still print the complete object including 
 * the (encrypted) password!
 * 
 * We use a regular function here instead of a fat-arrow function, since 
 * a fat-arrow (lambda) expression has no access to 'this', which we do need here.
 */
Person.prototype.toString = function personToString() {
    var copy = Object.assign({}, this);
    delete copy.password
    return copy
}

module.exports = Person;
