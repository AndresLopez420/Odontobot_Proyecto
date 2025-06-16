const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js'); // Cambia esto para importar desde index.js

chai.use(chaiHttp);
const { expect } = chai;

describe('Pruebas de API', function() {
  describe('POST /signup', function() {
    it('debería registrar un nuevo usuario con éxito', function(done) {
      chai.request(app)
        .post('/user/signup')
        .send({ rut: '12121212', password: 'password123', rol: 'profesor' })
        .end((err, res) => {
          if (err) {
            console.error(err);
            return done(err);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('Registro completado en ambas tablas');
          done();
        });
    });

    it('debería devolver error si el RUT ya está registrado', function(done) {
      chai.request(app)
        .post('/user/signup')
        .send({ rut: '12345678', password: 'password123' })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message').eql('El RUT ya está registrado');
          done();
        });
    });
  });
});
