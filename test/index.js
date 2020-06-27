import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.use(chaiHttp);

describe('Authentication endpoints', () => {
  describe('Sign up endpoint', () => {
    it('should create a new user', (done) => {
      chai
        .request(server)
        .post('/api/v1/signup')
        .send({
          email: 'test@nodejs-starter-pack.com',
          password: '123456',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.status).to.equal('success');
          if (err) return done(err);
          done();
        });
    });

    it('should fail if email or password is absent', (done) => {
      chai
        .request(server)
        .post('/api/v1/signup')
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('All fields are required');
          if (err) return done(err);
          done();
        });
    });

    it('should fail if user already exists', (done) => {
      chai
        .request(server)
        .post('/api/v1/signup')
        .send({
          email: 'test@nodejs-starter-pack.com',
          password: '123456',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.equal('error');
          expect(res.body.message).to.equal('A user exist with this email');
          if (err) return done(err);
          done();
        });
    });
  });
});
