import { expect } from 'chai';
import supertest from 'supertest';
import app from '../../index';

const request = supertest(app);

describe('Sub Location API', () => {
  describe('# Create Sub Location: ', () => {
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

    it('should not create a location with the same name', (done) => {
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
    it('should return all sub locations', (done) => {
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
  });

  describe('Update Sub Location: ', () => {
    it('displays success message after updating a sub location successfully', (done) => {
      request.put('/api/v1/sublocation/1')
        .send({
          name: 'sub',
          femaleResidents: '4',
          maleResidents: 16
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          console.log(res.body)
          expect(res.body.data.subLocation.updatedSubLocation.totalResidents).to.equal(20);
          done();
        });
    });
  });

  describe('Delete sub Loction: ', () => {
    it('should return a success message after deleting a parent location', (done) => {
        request.delete('/api/v1/subLocation/1')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          console.log(res.body)
          expect(res.body.data.message).to.equal('The sublocation has been successfully deleted');
          done();
        });
    });
  });
});
