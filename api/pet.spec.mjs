import request from 'supertest'
import { expect } from 'chai'
import * as pet from './data/pet.json'assert { type: 'json'}

describe('Test petstore\s pets endpoints', () => {
    const baseUrl = 'https://petstore.swagger.io/'
    let fuzzId = ''
    let existingPet = ''

    it('should create good doggo Fuzz', (done) => {
        // This test return 200 and an Id but for a reason I ignore I can't find
        // this Id later so I'm not sure of the status of this test
        request(baseUrl)
            .post('v2/pet')
            .send(pet)
            .set('Accept', 'application/json')
            .set('content-type', 'application/json')
            .end(function(err, response) {
                expect(response.statusCode).to.be.equal(200)
                // storing created pet Id here to reuse later
                // But it does not work
                fuzzId = response.body.id
                if(err) {
                    throw err
                }
                done()
            })
    })
    
    it('should retrieve pets by status', (done) => {
        request(baseUrl)
            .get('v2/pet/findByStatus?status=available')
            .set('Accept', 'application/json')
            .set('content-type', 'application/json')
            .end(function(err, response) {
                //Checks to do
                expect(response.statusCode).to.be.equal(200)
                expect(response.body.length).to.be.greaterThan(0)
                // Storing an existing Id to reuse later
                existingPet = response.body[1]
                if(err) {
                    throw err
                }
                done()
            })
    })

    it('should find existing pet by Id', (done) => {
        // For the test to work, I'll use the Id of the first pet
        // returned by findByStatus method
        request(baseUrl)
            .get('v2/pet/'+existingPet.id)
            .set('Accept', 'application/json')
            .set('content-type', 'application/json')
            .end(function(err, response) {
                expect(response.statusCode).to.be.equal(200)

                // expect(response.body).to.be.equal(existingPet)
                // I'll only compare Ids instead of the whole pet object 
                // Because for the same Id, api return different objects
                expect(response.body.id).to.be.equal(existingPet.id)
                if(err) {
                    throw err
                }
                done()
            })
    })
})