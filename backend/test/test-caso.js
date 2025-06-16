const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js'); // Asegúrate de que esta ruta apunte a tu aplicación

const { expect } = chai;

chai.use(chaiHttp);

describe('Pruebas de Integración con Casos Clínicos', function() {
  let token; // Aquí deberías obtener o generar el token de autenticación
  let casoClinicoId; // Para almacenar el ID del caso clínico creado

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

  describe('POST /casoClinico/add', function() {
    it('debería crear un nuevo caso clínico', function(done) {
      chai.request(app)
        .post('/casoClinico/add')
        .set('Authorization', `Bearer ${token}`)
        .attach('examenes', 'test/files/examen1.jpg')
        .attach('examen_intraoral', 'test/files/intraoral.png')
        .attach('examen_extraoral', 'test/files/extraoral.png')
        .field('id_profesor', 1)
        .field('nombre_caso', 'Caso Clínico 2')
        .field('dificultad', 'Alta')
        .field('instancia', 'Instancia 1')
        .field('modulo', 'Módulo 1')
        .field('clase', 'Clase 1')
        .field('patologia', 'Patología 1')
        .field('motivo_consulta', 'Consulta 1')
        .field('ultima_visita', '2025-04-01')
        .field('sintomas_ap', 'Síntomas 1')
        .field('molestia_ap', 'Molestia 1')
        .field('enfermedadescronicas_ar', 'Enfermedades 1')
        .field('alergias_ar', 'Alergias 1')
        .field('medicamentos_ar', 'Medicamentos 1')
        .field('antecedentes_ar', 'Antecedentes 1')
        .field('habitos_ar', 'Hábitos 1')
        .field('higiene_ar', 'Higiene 1')
        .field('nombre_pv', 'Paciente Virtual 1')
        .field('fecha_nacimiento', '2000-01-01')
        .field('nacionalidad', 'Chilena')
        .field('telefono', '123456789')
        .field('actividad', 'Estudiante')
        .field('genero', 'Femenino')
        .field('direccion', 'Calle Falsa 123')
        .field('rut', '12345678-9')
        .end((err, res) => {
          if (err) return done(err);
          console.log('Respuesta de creación:', res.body); 
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('Caso clínico y paciente creados correctamente');
          casoClinicoId = res.body.id_caso; // Guarda el ID del caso clínico creado
          done();
        });
    });
  });
 
  describe('GET /casoClinico/get', function() {
    it('debería devolver una lista de casos clínicos', function(done) {
      chai.request(app)
        .get('/casoClinico/get')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /casoClinico/get/:id_caso', function() {
    it('debería devolver un caso clínico específico', function(done) {
      chai.request(app)
        .get(`/casoClinico/get/${casoClinicoId}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('PATCH /casoClinico/update', function() {
    it('debería actualizar un caso clínico existente', function(done) {
      chai.request(app)
        .patch('/casoClinico/update')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id_caso: casoClinicoId,
          nombre_caso: 'Caso Clínico Actualizado',
          dificultad: 'Media',
          instancia: 'Instancia 2',
          modulo: 'Módulo 2',
          clase: 'Clase 2',
          patologia: 'Patología 2',
          motivo_consulta: 'Consulta 2',
          ultima_visita: '2025-05-01',
          sintomas_ap: 'Síntomas 2',
          molestia_ap: 'Molestia 2',
          enfermedadescronicas_ar: 'Enfermedades 2',
          alergias_ar: 'Alergias 2',
          medicamentos_ar: 'Medicamentos 2',
          antecedentes_ar: 'Antecedentes 2',
          habitos_ar: 'Hábitos 2',
          higiene_ar: 'Higiene 2',
          examen_intraoral: 'intraoral.jpg',
          examen_extraoral: 'extraoral.jpg',
          examenes: 'examenes.jpg'
        })
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('Caso clínico actualizado correctamente');
          done();
        });
    });
  });

  describe('DELETE /casoClinico/delete/:id_caso', function() {
    it('debería eliminar un caso clínico y su paciente relacionado', function(done) {
      chai.request(app)
        .delete(`/casoClinico/delete/${casoClinicoId}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').eql('Caso clínico y paciente eliminados correctamente');
          done();
        });
    });
  });

});
