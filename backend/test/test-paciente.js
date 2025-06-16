const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js'); // Asegúrate de que esta ruta apunte a tu aplicación

const { expect } = chai;

chai.use(chaiHttp);

describe('Pruebas de Integración con Pacientes', function() {
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

  describe('GET /paciente/getpaciente', function() {
    it('debería devolver una lista de pacientes', function(done) {
      chai.request(app)
        .get('/paciente/getpaciente')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('POST /paciente/addpaciente', function() {
    it('debería crear un nuevo paciente', function(done) {
      chai.request(app)
        .post('/paciente/addpaciente')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id_caso: 1,
          nombre_pv: 'Juan Pérez',
          fecha_nacimiento: '1990-01-01',
          nacionalidad: 'Chilena',
          telefono: '123456789',
          actividad: 'Ingeniero',
          genero: 'Masculino',
          direccion: 'Calle Falsa 123',
          rut: '12345678-9'
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('Paciente creado correctamente');
          done();
        });
    });

    it('debería devolver error si faltan campos obligatorios', function(done) {
      chai.request(app)
        .post('/paciente/addpaciente')
        .set('Authorization', `Bearer ${token}`)
        .send({
            id_caso: 1,
            nombre_pv: 'Juan Pérez'
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });
});
