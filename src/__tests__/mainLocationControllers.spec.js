import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Main Location API', () => {
  describe('# Create Main Location', () => {
    it('Should not add a location without a name', (done) => {
      request.post('/api/v1/location')
        .send({
          name: '',
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.name)
            .to.equal('Please provide a name for the location');
          done();
        });
    });

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
    it('Should not edit a location that the id is not a number', (done) => {
      request.put('/api/v1/location/:mainLocationId')
        .send({
          name: 'Calabar',
        })
        .end((errors, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.mainLocationId)
            .to.equal('Location Id must be a number');
          done();
        });
    });
  
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

    it('Should not edit a location that does not exist', (done) => {
      request.put('/api/v1/location/100')
        .send({
          name: 'Calabar',
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.title).to.equal('Not Found');
          expect(response.body.errors.detail)
            .to.equal('Can\'t find location with id 100');
          done();
        });
    });
  });

  describe('# Get a main location ', () => {
    it('should a main location', (done) => {
        request.get('/api/v1/location/1')
        .end((err, response) => {
          expect(response.status).to.equal(200);
          expect(response.body).to.be.an('object');
          expect(response.body.data.location.name).to.equal('test');
          done();
        });
    });

    it('Should not get a location that does not exist', (done) => {
      request.get('/api/v1/location/80')
        .end((error, response) => {
          expect(response.statusCode).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.title).to.equal('Not Found');
          expect(response.body.errors.detail)
            .to.equal('Can\'t find a location with that Id');
          done();
        });
    });

    it('Should not get a location id that is not a number', (done) => {
      request.get('/api/v1/location/:mainLocationId')
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.mainLocationId)
            .to.equal('Location Id must be a number');
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

    it('Should not delete a location that does not exist', (done) => {
      request.delete('/api/v1/location/80')
        .end((error, response) => {
          expect(response.statusCode).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.title).to.equal('Not Found');
          expect(response.body.errors.detail)
            .to.equal('Can\'t find a location with that Id');
          done();
        });
    });
  });
});
