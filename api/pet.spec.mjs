import request from 'supertest'
import { expect } from 'chai'
import * as pet from './data/pet.json' assert { type: 'json'}
import * as updatePet from './data/updatePet.json' assert { type: 'json'}

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
                expect(response.statusCode).to.be.equal(200)
                expect(response.body.length).to.be.greaterThan(0)
                if(err) {
                    throw err
                }
                done()
            })
    })

    it('should find Fuzz pet by Id', (done) => {
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

    it('should update Fuzz pet', (done) => {
        request(baseUrl)
            .put('v2/pet/')
            .send(updatePet.default)
            .set('Accept', 'application/json')
            .set('content-type', 'application/json')
            .end(function(err, response) {
                expect(response.statusCode).to.be.equal(200)
                expect(response.body.name).to.be.equal(fuzzPet.name)
                expect(response.body.category.name).to.be.equal(fuzzPet.category.name)
                expect(response.body.tags.name).to.be.equal(updatePet.default.tags.name)
                expect(response.body.tags[0].name).not.to.be.equal(fuzzPet.tags[0].name)
                expect(response.body.status).to.be.equal(fuzzPet.status)
                if(err) {
                    throw err
                }
                done()
            })
    })

    it('should delete Fuzz pet', (done) => {
        request(baseUrl)
            .delete('v2/pet/'+fuzzPet.id)
            .set('Accept', 'application/json')
            .set('api_key', 'special_key')
            .end(function(err, response) {
                expect(response.statusCode).to.be.equal(200)
                expect(parseInt(response.body.message, 10)).to.be.equal(fuzzPet.id)
                if(err) {
                    throw err
                }
                done()
            })
    })

    it('verify Fuzz pet does not exists anymore', (done) => {
        request(baseUrl)
            .get('v2/pet/'+fuzzPet.id)
            .set('Accept', 'application/json')
            .end(function(err, response) {
                expect(response.statusCode).not.to.be.equal(200)
                expect(response.statusCode).to.be.equal(404)
                if(err) {
                    throw err
                }
                done()
            })
    })
})