const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

chai.should()
chai.use(chaiHttp)

const endpointToTest = '/api/persons'

describe('Person API POST', () => {
    it('should return a valid person when posting a valid object', (done) => {
        /**
         * require('authentication.test') forces that test to be run before our tests.
         * That provides us with a valid token that we use for authentication our requests.
         */
        const token = require('./authentication.test').token
        chai.request(server)
            .post(endpointToTest)
            .set('x-access-token', token)
            .send({
                'firstname': '  FirstName  ',
                'lastname': '  LastName   ',
                'email': ' user@host.com ',
                'password': ' secret '
            })
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')

                const person = res.body
                person.should.have.property('name').that.is.an('object')

                const name = person.name
                name.should.have.property('firstname').equals('FirstName')
                name.should.have.property('lastname').equals('LastName')
                person.should.have.property('email').equals('user@host.com')
                person.should.not.have.property('password')
                done()
        })
    })

    it('should throw an error when using invalid JWT token', (done) => {
        chai.request(server)
            .post(endpointToTest)
            .set('x-access-token', 'in.valid.token')
            .send({
                'firstname': '  FirstName  ',
                'lastname': '  LastName   ',
                'email': ' user@host.com ',
                'password': ' secret '
            })
            .end((err, res) => {
                res.should.have.status(401)
                res.body.should.be.a('object')
                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(401)
                error.should.have.property('datetime')
                done()
            })
    })

    it('should throw an error when no firstname is provided', (done) => {
        const token = require('./authentication.test').token
        chai.request(server)
            .post(endpointToTest)
            .set('x-access-token', token)
            .send({
                'lastname': '  LastName   ',
                'email': ' user@host.com ',
                'password': ' secret '
            })
            .end((err, res) => {
                res.should.have.status(422)
                res.body.should.be.a('object')

                const error = res.body
                error.should.have.property('message')
                error.should.have.property('code').equals(422)
                error.should.have.property('datetime')

                done()
            })
    })

    it.skip('should throw an error when no valid firstname is provided', (done) => {
        // Write your test here
        done()
    })

    it.skip('should throw an error when no lastname is provided', (done) => {
        // Write your test here
        done()
    })

    it.skip('should throw an error when no valid lastname is provided', (done) => {
        // Write your test here
        done()
    })

})

describe('Person API GET', () => {
    it.skip('should return an array of persons', (done) => {
        // Write your test here
        done()
    })

})

describe('Person API PUT', () => {
    it('should return the updated person when providing valid input', (done) => {
        const token = require('./authentication.test').token
        // console.log('token = ' + token)
        chai.request(server)
            .put(endpointToTest + '/0')
            .set('x-access-token', token)
            .send({
                'firstname': '  NewFirstName  ',
                'lastname': '  NewLastName   ',
                'email': ' user@host.com ',
                'password': ' secret '
            })
            .end((err, res) => {
                // Check: 
                // Verify that the person that we get is the updated person.
                res.should.have.status(200)
                res.body.should.be.a('object')

                const response = res.body
                response.should.have.property('name').which.is.an('object')
                const name = response.name
                name.should.have.property('firstname').equals('NewFirstName')
                name.should.have.property('lastname').equals('NewLastName')

                // Double check:
                // Send a GET-request to verify that the person has been updated.
                chai.request(server)
                    .get('/api/persons')
                    .set('x-access-token', token)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.an('array')
                        const result = res.body
                        result[0].name.should.have.property('firstname').equals('NewFirstName')
                        result[0].name.should.have.property('lastname').equals('NewLastName')

                        done()
                    })
            })
    })
})

describe('Person API DELETE', () => {
    it.skip('should return http 200 when deleting a person with existing id', (done) => {
        // Write your test here
        done()
    })

})