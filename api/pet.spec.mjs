import request from 'supertest'
import { expect } from 'chai'
import * as pet from './data/pet.json' assert { type: 'json'}

describe('Test petstore\s pets endpoints', () => {
    const baseUrl = 'https://petstore.swagger.io/'
    let fuzzPet = ''

    it('should create good doggo Fuzz', (done) => {
        request(baseUrl)
            .post('v2/pet')
            .send(pet.default)
            .set('Accept', 'application/json')
            .set('content-type', 'application/json')
            .end(function(err, response) {
                expect(response.statusCode).to.be.equal(200)
                // storing created pet Id here to reuse later
                fuzzPet = response.body
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
            .end(function(err, response) {
                //Checks to do
                expect(response.statusCode).to.be.equal(200)
                expect(response.body.length).to.be.greaterThan(0)
                if(err) {
                    throw err
                }
                done()
            })
    })

    it('should find existing pet by Id', (done) => {
        request(baseUrl)
            .get('v2/pet/'+fuzzPet.id)
            .set('Accept', 'application/json')
            .end(function(err, response) {
                expect(response.statusCode).to.be.equal(200)
                expect(response.body.name).to.be.equal(fuzzPet.name)
                expect(response.body.category.name).to.be.equal(fuzzPet.category.name)
                expect(response.body.tags.name).to.be.equal(fuzzPet.tags.name)
                expect(response.body.status).to.be.equal(fuzzPet.status)
                if(err) {
                    throw err
                }
                done()
            })
    })
})