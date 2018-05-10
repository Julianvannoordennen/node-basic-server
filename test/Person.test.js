//
// Unittest for the Person class
//
const chai = require('chai')
const Person = require('../model/Person')
const assert = require('assert')

chai.should()

describe('Person', () => {

    it('should accept exactly four arguments', (done) => {
        assert.throws(() => new Person())
        assert.throws(() => new Person('test'))
        assert.throws(() => new Person('test', 'test'))
        assert.throws(() => new Person('test', 'test', 'test@test.com'))
        // assert.throws(() => new Person('test', 'test', 'test@test.com', 'test', 'test'))
        done()
    })

    it('should accept only strings as arguments', (done) => {
        assert.throws(() => new Person(1, 2, 3, 4))
        assert.throws(() => new Person({}, {}, {}, {}))
        assert.throws(() => new Person([], [], [], []))
        assert.throws(() => new Person(true, true, true, true))
        done()
    })

    it('should be intitialized successfully when providing valid arguments', (done) => {
        const person = new Person('  abc  ', '  def  ', '  valid.email@someserver.com ', ' secret ')
        person.should.have.property('name')
        const name = person.name
        name.should.have.property('firstname').equals('abc')
        name.should.have.property('lastname').equals('def')
        person.should.have.property('email').equals('valid.email@someserver.com')
        person.should.not.have.property('password')
        done()
    })

})
