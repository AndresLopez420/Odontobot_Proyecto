const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');

chai.use(chaiHttp);
const { expect } = chai;

let token; // Variable para almacenar el token

describe('Pruebas de Integración con Usuarios', function() {
  describe('POST /user/signup', function() {
    it('debería registrar un nuevo usuario con éxito', function(done) {
      chai.request(app)
        .post('/user/signup')
        .send({ rut: 'uniqueRut123', password: 'password123', rol: 'profesor' }) // Usa un RUT único
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('Registro completado en ambas tablas');
          done();
        });
    });

    it('debería devolver error si el RUT ya está registrado', function(done) {
      chai.request(app)
        .post('/user/signup')
        .send({ rut: 'uniqueRut123', password: 'password123' }) // Usando el RUT ya registrado
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message').eql('El RUT ya está registrado');
          done();
        });
    });

    it('debería devolver error si faltan campos obligatorios', function(done) {
      chai.request(app)
        .post('/user/signup')
        .send({ password: 'password123' }) // Falta el RUT
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message').eql('El RUT y la contraseña son obligatorios');
          done();
        });
    });
  });

  describe('POST /user/login', function() {
    it('debería iniciar sesión con éxito', function(done) {
      chai.request(app)
        .post('/user/login')
        .send({ rut: 'uniqueRut123', password: 'password123' }) // Usa el RUT registrado
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          expect(res.body).to.have.property('rol').eql('profesor');
          token = res.body.token; // Almacena el token
          done();
        });
    });

    it('debería devolver error si RUT o contraseña son incorrectos', function(done) {
      chai.request(app)
        .post('/user/login')
        .send({ rut: 'uniqueRut123', password: 'wrongpassword' })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message').eql('RUT o contraseña incorrecta');
          done();
        });
    });
  });

  describe('GET /user/get', function() {
    it('debería devolver una lista de usuarios profesores', function(done) {
      chai.request(app)
        .get('/user/get')
        .set('Authorization', `Bearer ${token}`) // Usa el token almacenado
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('PATCH /user/update', function() {
    it('debería actualizar el rol de un usuario', function(done) {
      chai.request(app)
        .patch('/user/update')
        .set('Authorization', `Bearer ${token}`) // Usa el token almacenado
        .send({ id_usuario: 2, rol: 'estudiante' }) // Cambia el ID y el rol según tu base de datos
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('El usuario a sido actualizado');
          done();
        });
    });
  
    it('debería devolver error si el ID de usuario no existe', function(done) {
      chai.request(app)
        .patch('/user/update')
        .set('Authorization', `Bearer ${token}`) // Usa el token almacenado
        .send({ id_usuario: 9999, rol: 'admin' }) // ID que no existe
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message').eql('id de usuario no existe');
          done();
        });
    });
  });
  

  describe('GET /user/checkToken', function() {
    it('debería devolver un mensaje de verificación de token', function(done) {
      chai.request(app)
        .get('/user/checkToken')
        .set('Authorization', `Bearer ${token}`) // Usa el token almacenado
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('true');
          done();
        });
    });
  });
});
