const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js'); // Asegúrate de que esta ruta apunte a tu aplicación

const { expect } = chai;

chai.use(chaiHttp);

describe('Pruebas de Integración con Instancias', function() {
  let token; // Aquí deberías obtener o generar el token de autenticación

  before(function(done) {
    // Obtener el token de autenticación aquí
    chai.request(app)
      .post('/user/login') // Cambia a la ruta de login de tu aplicación
      .send({ rut: '123', password: '123' }) // Cambia según tus datos de prueba
      .end((err, res) => {
        if (err) done(err);
        token = res.body.token; // Ajusta según la respuesta de tu servidor
        done();
      });
  });

  describe('POST /instancia/add', function() {
    it('debería crear una nueva instancia', function(done) {
      chai.request(app)
        .post('/instancia/add')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id_profesor: 1,
          id_pv: 1,
          nombre_instancia: 'Instancia 1',
          tipo_instancia: 'Tipo 1',
          descripcion: 'Descripción de prueba',
          practicas_minimas: 5,
          intentos: 3,
          entrega: '2025-05-01',
          estado: 'activo',
          modalidad: 'online',
          fecha_inicio: '2025-04-01',
          fecha_termino: '2025-04-30',
          id_caso: 1
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('Instancia creada correctamente');
          done();
        });
    });
  });

  describe('GET /instancia/get', function() {
    it('debería devolver una lista de instancias', function(done) {
      chai.request(app)
        .get('/instancia/get')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('PATCH /instancia/update', function() {
    it('debería actualizar una instancia existente', function(done) {
      chai.request(app)
        .patch('/instancia/update')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id_profesor: 1,
          id_pv: 1,
          nombre_instancia: 'Instancia Actualizada',
          tipo_instancia: 'Tipo 2',
          descripcion: 'Descripción actualizada',
          practicas_minimas: 6,
          intentos: 4,
          entrega: '2025-06-01',
          estado: 'inactivo',
          modalidad: 'presencial',
          fecha_inicio: '2025-05-01',
          fecha_termino: '2025-05-31',
          id_caso: 1,
          id_instancia: 25 // Asegúrate de que este ID exista
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('Instancia actualizada correctamente');
          done();
        });
    });
  });

  describe('GET /instancia/getByCaso/:id_caso', function() {
    it('debería devolver instancias por caso clínico', function(done) {
      chai.request(app)
        .get('/instancia/getByCaso/1') // Cambia el ID según tus datos
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /instancia/getCasoByInstancia/:id_instancia', function() {
    it('debería devolver el id_caso por id_instancia', function(done) {
      chai.request(app)
        .get('/instancia/getCasoByInstancia/22') // Cambia el ID según tus datos
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('id_caso');
          done();
        });
    });
  });

  describe('DELETE /instancia/delete/:id_instancia', function() {
    it('debería eliminar una instancia', function(done) {
      chai.request(app)
        .delete('/instancia/delete/24') // Cambia el ID según tus datos
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('La instancia ha sido eliminado correctamente');
          done();
        });
    });
  });

});
