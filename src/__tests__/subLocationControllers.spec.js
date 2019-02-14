import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Sub Location API', () => {
  describe('# Create Sub Location: ', () => {
    it('Should create a sublocation if all details are correct', (done) => {
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

    it('Should not add a sublocation without a name', (done) => {
      request.post('/api/v1/sublocation/2')
        .send({
          name: '',
          maleResidents: 2,
          femaleResidents: 2
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.name)
            .to.equal('Please provide a name for the sublocation');
          done();
        });
    });

    it('Should not add a sublocation without a number for male residents', (done) => {
      request.post('/api/v1/sublocation/2')
        .send({
          name: 'Kano',
          maleResidents: '',
          femaleResidents: 2
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.maleResidents)
            .to.equal('Please provide the number of male residents');
          done();
        });
    });

    it('Should not add a sublocation without a number for female residents', (done) => {
      request.post('/api/v1/sublocation/2')
        .send({
          name: 'Kano',
          maleResidents: 2,
          femaleResidents: ''
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.femaleResidents)
            .to.equal('Please provide the number of female residents');
          done();
        });
    });

    it('Should create a sublocation if all details are correct', (done) => {
      request.post('/api/v1/sublocation/2')
        .send({
          name: 'sub-test',
          maleResidents: 4,
          femaleResidents: 4,
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data.location.totalResidents).to.equal(8);
          done();
        });
    });

    it('should not create a subocation with the same name', (done) => {
      request.post('/api/v1/sublocation/1')
        .send({
          name: 'sub-test',
          maleResidents: 4,
          femaleResidents: 4,
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.errors.detail).to.equal('A sub location with this name already exist');
          done();
        });
    });
  });

  describe('Get All Sub Locations: ', () => {
    it('should return all sublocations', (done) => {
      request.get('/api/v1/sublocation')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe('Get A Sub Location: ', () => {
    it('should return a single sub location', (done) => {
      request.get('/api/v1/sublocation/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.subLocation.name).to.equal('sub-test');
          expect(res.body.data.subLocation.maleResidents).to.equal(4);
          expect(res.body.data.subLocation).to.have.property('mainLocation');
          if (err) return done(err);
          done();
        });
    });

    it('Should not get a sublocation that does not exist', (done) => {
      request.get('/api/v1/sublocation/90')
        .end((error, response) => {
          expect(response.statusCode).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.title).to.equal('Not Found');
          expect(response.body.errors.detail)
            .to.equal('Can\'t find a sublocation with that Id');
          done();
        });
    });

    it('Should not get a sublocation id that is not a number', (done) => {
      request.get('/api/v1/sublocation/:subLocationId')
        .end((error, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.subLocationId)
            .to.equal('Sublocation Id must be a number');
          done();
        });
    });
  });

  describe('# Edit Sub Location: ', () => {
    it('Should not edit a sublocation that the id is not a number', (done) => {
      request.put('/api/v1/sublocation/:subLocationId')
        .send({
          name: 'Sokoto',
          femaleResidents: '4',
          maleResidents: 16
        })
        .end((errors, response) => {
          expect(response.statusCode).to.equal(400);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.subLocationId)
            .to.equal('Sublocation Id must be a number');
          done();
        });
    });

    it('Should edit a sublocation if all details are correct', (done) => {
      request.put('/api/v1/sublocation/1')
        .send({
          name: 'sub',
          femaleResidents: '4',
          maleResidents: 16
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.subLocation.updatedSubLocation.totalResidents).to.equal(20);
          done();
        });
    });

    it('Should not edit a sublocation that does not exist', (done) => {
      request.put('/api/v1/sublocation/100')
        .send({
          name: 'sub',
          femaleResidents: '4',
          maleResidents: 16
        })
        .end((error, response) => {
          expect(response.statusCode).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.title).to.equal('Not Found');
          expect(response.body.errors.detail)
            .to.equal('Can\'t find sublocation with id 100');
          done();
        });
    });
  });

  describe('Delete sub Loction: ', () => {
    it('should return a success message after deleting a parent location', (done) => {
        request.delete('/api/v1/subLocation/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.message).to.equal('The sublocation has been successfully deleted');
          done();
        });
    });

    it('Should not delete a sublocation that does not exist', (done) => {
      request.delete('/api/v1/sublocation/80')
        .end((error, response) => {
          expect(response.statusCode).to.equal(404);
          expect(response.body).to.be.an('object');
          expect(response.body.errors.title).to.equal('Not Found');
          expect(response.body.errors.detail)
            .to.equal('Can\'t find a sublocation with that Id');
          done();
        });
    });
  });
});
