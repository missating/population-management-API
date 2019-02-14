import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Main Location API', () => {
  describe('# Create Main Location', () => {
    it('Should create a location if all details are correct', (done) => {
      request.post('/api/v1/location')
        .send({
          name: 'test',
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(201);
          expect(response.body).to.be.an('object');
          expect(response.body.data.location).to.have.property('name');
          done();
        });
    });

    it('should not create a location with same name', (done) => {
        request.post('/api/v1/location')
        .send({
          name: 'test'
        })
        .end((err, response) => {
          expect(response.status).to.equal(409);
          expect(response.body.errors.detail)
            .to.equal('A location with this name already exist');
          done();
        });
    });
  });

  describe('# Edit Main Location ', () => {
    it('Should edit a location if all details are correct', (done) => {
        request.put('/api/v1/location/1')
        .send({ 
          name: 'test' 
        })
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.data.location.name).to.equal('test');
          done();
        });
    });
  });

  describe('# Get a main location ', () => {
    it('should a main location', (done) => {
        request.get('/api/v1/locqtion/1')
        .end((err, response) => {
          expect(response.status).to.equal(200);
          done();
        });
    });
  });

  describe('# Get all main location', () => {
    it('Should get all main location', (done) => {
      request.get('/api/v1/location')
        .end((error, response) => {
          expect(response.statusCode).to.equal(200);
          done();
        });
    });
  });

  describe('# Delete main loction: ', () => {
    it('should successfully delete a center', (done) => {
      request.delete('/api/v1/location/1')
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body.data.message).to.equal('The Location has been successfully deleted');
          done();
        });
    });
  });
});
