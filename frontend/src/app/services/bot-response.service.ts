import { Injectable } from '@angular/core';

interface Responses {
  [key: string]: string[];
}

interface SelectedCase {
  ruta: string;
  url: string;
  // otras propiedades del caso
}

interface Checklist {
  [key: string]: boolean; // Indica si cada categoría está completada
}

@Injectable({
  providedIn: 'root'
})
export class BotResponseService {
  private responses: Responses = {
    saludo: [
      'Hola, doctor. Gracias por atenderme el día de hoy.',
      'Buenos días, doctor. Me alegro de verlo.'
    ],
    saludo2: [
      'Me encuentro bien, gracias por preguntar.'
    ],
    seguir: [
      'Entiendo doctor, continuemos con la entrevista.',
      'Entiendo, sigamos porfavor.'
    ],
    seguir2: [
      'Entiendo doctor, le dire lo que necesite saber sobre mi.',
    ],
    nombre: [
      'Mi nombre es {nombre_pv}.',
      'Me llamo {nombre_pv}.',
      'Soy {nombre_pv}.'
    ],
    fechaNacimiento: [
      'Naci el {fecha_nacimiento}.',
      'Mi fecha de nacimiento es {fecha_nacimiento}.',
    ],
    edad: [
      'Tengo {edad}.'
    ],
    raza: [
      'Mi nacionalidad es {nacionalidad}.'
    ],
    telefono: [
      'El numero telefonico es {telefono}.',
      'Mi numero es {telefono}.'
    ],
    actividad: [
      'Me dedico ha ser {actividad}.',
      'Me actividad principal es {actividad}.',
    ],
    genero: [
      'Mi genero es {genero}.',
      '{genero}.'
    ],
    direccion: [
      'Mi dirección es {direccion}.',
      'Vivo en {direccion}.',
      'Mi residencia se encuentra en {direccion}.',
    ],
    rut: [
      'Mi RUT es {rut}.'
    ],
    motivoConsulta: [
      'El motivo de mi visita es {motivo_consulta}.',
      'La razón por la que vengo es por {motivo_consulta}.',
      'Vine aquí por {motivo_consulta}.',
      'Tengo {motivo_consulta}.'
    ],
    ultimaVisita: [
      'La última vez que visité al dentista fue el {ultima_visita}.',
      'Mi última visita fue el {ultima_visita}.'
    ],
    sintomas_ap: [
      '{sintomas_ap}.'
    ],
    molestia_ap: [
      '{molestia_ap}.'
    ],
    enfermedadescronicas_ar: [
      '{enfermedadescronicas_ar}.'
    ],
    alergias_ar: [
      '{alergias_ar}.'
    ],
    medicamentos_ar: [
      '{medicamentos_ar}.'
    ],
    antecedentes_ar: [
      '{antecedentes_ar}.'
    ],
    habitos_ar: [
      '{habitos_ar}.'
    ],
    higiene_ar: [
      '{higiene_ar}.'
    ],  
    examenes: [
      'Le entrego mi examen: <div style="overflow: hidden;"><img src="{examenes}" alt="Imagen" style="width: 300px; height: auto; margin: 10px; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);"></div>',
    ],
    intraoral: [
      '<div style="overflow: hidden;"><img src="{intraoral}" alt="Imagen" style="width: 300px; height: auto; margin: 10px; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);"></div>',
    ],
    extraoral: [
      '<div style="overflow: hidden;"><img src="{extraoral}" alt="Imagen" style="width: 300px; height: auto; margin: 10px; box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);"></div>',
    ],
  };

  private keywords: { [key: string]: string } = {
    hola: 'saludo',    
    buenas: 'saludo',
    buenos: 'saludo',
    nombre: 'nombre',
    'quien': 'nombre',
    'como estas': 'saludo2',
    'que tal': 'saludo2',
    'como va tu dia': 'saludo2',
    'que cuentas': 'saludo2',
    'llamas': 'nombre',
    'dirección': 'direccion',
    'direccion': 'direccion',
    'vive': 'direccion',
    'residencia': 'direccion',
    'donde': 'direccion',
    'nacimiento': 'fechaNacimiento',
    'naciste': 'fechaNacimiento',
    'edad tiene': 'edad',
    'edad?': 'edad',
    'años': 'edad',
    'nacionalidad': 'raza',
    'contacto': 'telefono',
    'telefono': 'telefono',
    'telefonico': 'telefono',
    'celular': 'telefono',
    'actividad': 'actividad',
    'dedica': 'actividad',
    'profesion': 'actividad',
    'profesión': 'actividad',
    'género': 'genero',
    'genero': 'genero',
    'sexo': 'genero',
    'rut': 'rut',
    'patología': 'patologia',
    'patologia': 'patologia',
    'id caso': 'idCaso',
    'id profesor': 'idProfesor',
    'nombre caso': 'nombreCaso',
    dificultad: 'dificultad',
    instancia: 'instancia',
    clase: 'clase',
    'motivo': 'motivoConsulta',
    'razón': 'motivoConsulta',
    'razon': 'motivoConsulta',
    'viene': 'motivoConsulta',
    'porque vino': 'motivoConsulta',
    'porque vinó': 'motivoConsulta',
    'por que vino': 'motivoConsulta',
    'por que vinó': 'motivoConsulta',
    'asistio': 'motivoConsulta',
    'asistió': 'motivoConsulta',
    'acude': 'motivoConsulta',
    'acudió': 'motivoConsulta',
    'acudio': 'motivoConsulta',
    'última visita': 'ultimaVisita',
    'ultima visita': 'ultimaVisita',
    'última vez que vino': 'ultimaVisita',
    'ultima vez que vino': 'ultimaVisita',
    'ultima': 'ultimaVisita',
    'última': 'ultimaVisita',
    'sintomas': 'sintomas_ap',
    'sintoma': 'sintomas_ap',
    'síntomas': 'sintomas_ap',
    'síntoma': 'sintomas_ap',
    'dolor': 'molestia_ap',
    'molestia': 'molestia_ap',
    'medicamento de uso diario': 'medicamentos_ar',
    'habitualmente': 'medicamentos_ar',
    'toma': 'medicamentos_ar',
    'usa': 'medicamentos_ar',
    'consume': 'medicamentos_ar',
    'remedio': 'medicamentos_ar',
    'enfermedad crónica': 'enfermedadescronicas_ar',
    'enfermedad cronica': 'enfermedadescronicas_ar',
    'alergica': 'alergias_ar',
    'alérgica': 'alergias_ar',
    'alergico': 'alergias_ar',
    'alérgico': 'alergias_ar',
    'alergia': 'alergias_ar',
    'alergias': 'alergias_ar',
    'pasado': 'antecedentes_ar',
    'anteriores': 'antecedentes_ar',
    'antecedente': 'antecedentes_ar',
    'hereditaria': 'antecedentes_ar',
    'familiar': 'antecedentes_ar',
    'familia': 'antecedentes_ar',
    'habitual': 'habitos_ar',
    'habitos': 'habitos_ar',
    'fuma': 'habitos_ar',
    'alcohol': 'habitos_ar',
    'droga': 'habitos_ar',
    'higiene': 'higiene_ar',
    'cepillado': 'higiene_ar',
    'lava': 'higiene_ar',
    'cepilla': 'higiene_ar',
    'hilo': 'higiene_ar',
    'exámenes': 'examenes',
    'examenes': 'examenes',
    'exámen': 'examenes',
    'examen': 'examenes',
    'radiografia': 'examenes',
    'documento': 'examenes',
    'abra la boca': 'intraoral',
    'interior': 'intraoral',
    'intraoral': 'intraoral',
    'sonrisa': 'extraoral',
    'sonria': 'extraoral',
    'boca': 'extraoral',
    'extraoral': 'extraoral',
    'exterior': 'extraoral',
    'seguir': 'seguir',
    'proseguir': 'seguir',
    'continuar': 'seguir',
    'avanzar': 'seguir',
    'avance': 'seguir',
    'entrevista': 'seguir',
    'consulta': 'seguir',
    'datos personales': 'seguir2',

  };

  private checklist: Checklist = {
    saludo: false,
    datosPaciente: false,
    motivoConsulta: false,
    anamnesisProxima: false,
    anamnesisRemota: false,
    examenExtraoral: false,
    examenIntraoral: false,
    examenes: false,
    hipotesisDiagnostica: false,
  };

  private patientDataChecklist: { [key: string]: boolean } = {
    nombre: false,
    fechaNacimiento: false,
    raza: false,
    telefono: false,
    actividad: false,
    genero: false,
    direccion: false,
    rut: false,
  };

  private categoryWeights: { [key: string]: number } = {
    saludo: 0.05,
    datosPaciente: 0.15,
    motivoConsulta: 0.1,
    anamnesisProxima: 0.15,
    anamnesisRemota: 0.15,
    examenExtraoral: 0.1,
    examenIntraoral: 0.1,
    examenes: 0.1,
    hipotesisDiagnostica: 0.1,
  };

  private anamnesisProximaChecklist: { [key: string]: boolean } = {
    sintomas_ap: false,
    molestia_ap: false,
  };
  
  private anamnesisRemotaChecklist: { [key: string]: boolean } = {
    enfermedadescronicas_ar: false,
    alergias_ar: false,
    medicamentos_ar: false,
    antecedentes_ar: false,
    habitos_ar: false,
    higiene_ar: false,
  };
  

  private formatDate(dateString: string): string {
    if (!dateString || dateString === 'desconocida') {
      return 'fecha desconocida';
    }
  
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'fecha inválida';
    }
  
    const day = date.getDate();
    const month = date.toLocaleString('es-ES', { month: 'long' });
    const year = date.getFullYear();
  
    const formattedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  
    return `${day} de ${formattedMonth} del ${year}`;
  }

  private calculateAge(birthDateString: string): string {
    if (!birthDateString) return 'edad desconocida';
  
    const birthDate = new Date(birthDateString);
    if (isNaN(birthDate.getTime())) return 'edad inválida';
  
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
  
    // Ajustar si el cumpleaños aún no ha llegado este año
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
  
    return `${age} años`;
  }

  public displayNames: { [key: string]: string } = {
    saludo: 'Saludo',
    datosPaciente: 'Datos del Paciente',
    motivoConsulta: 'Motivo de Consulta',
    anamnesisProxima: 'Anamnesis Próxima',
    anamnesisRemota: 'Anamnesis Remota',
    examenExtraoral: 'Examen Extraoral',
    examenIntraoral: 'Examen Intraoral',
    examenes: 'Exámenes',
    hipotesisDiagnostica: 'Hipótesis Diagnóstica',
  };
  
  

  private normalizeString(str: string): string {
    return str
      .toLowerCase() // Convertir a minúsculas
      .normalize('NFD') // Normalizar para eliminar tildes
      .replace(/[\u0300-\u036f]/g, ''); // Eliminar tildes
  }

  getBotResponse(userMessage: string, selectedCase: any): string | null {
    const normalizedMessage = this.normalizeString(userMessage);

    for (const keyword in this.keywords) {
      const normalizedKeyword = this.normalizeString(keyword);
      if (normalizedMessage.includes(normalizedKeyword)) {
        const category = this.keywords[keyword];
        const responses = this.responses[category];

        if (responses) {
          const responseTemplate = responses[Math.floor(Math.random() * responses.length)];
          
          // Marca la categoría como completada
          this.markCategoryCompleted(category);

          if (selectedCase) {
            // Manejo especial para la categoría 'examenes'
            if (category === 'examenes') {
              const imagePath = `/assets/uploads/${selectedCase.examenes}`;
              return responseTemplate.replace('{examenes}', imagePath);
            }

            if (category === 'intraoral') {
              const imagePath = `/assets/uploads/${selectedCase.examen_intraoral}`;
              return responseTemplate.replace('{intraoral}', imagePath);
            }

            if (category === 'extraoral') {
              const imagePath = `/assets/uploads/${selectedCase.examen_extraoral}`;
              return responseTemplate.replace('{extraoral}', imagePath);
            }
            
          
            // Para todas las demás categorías
            return responseTemplate
              .replace('{patologia}', selectedCase.patologia || 'desconocida')
              .replace('{id_caso}', selectedCase.id_caso || 'desconocida')
              .replace('{id_profesor}', selectedCase.id_profesor || 'desconocida')
              .replace('{nombre_caso}', selectedCase.nombre_caso || 'desconocida')
              .replace('{dificultad}', selectedCase.dificultad || 'desconocida')
              .replace('{instancia}', selectedCase.instancia || 'desconocida')
              .replace('{clase}', selectedCase.clase || 'desconocida')
              .replace('{motivo_consulta}', selectedCase.motivo_consulta || 'desconocida')
              .replace('{ultima_visita}', selectedCase.ultima_visita ? this.formatDate(selectedCase.ultima_visita) : 'desconocida')
              .replace('{sintomas_ap}', selectedCase.sintomas_ap || 'desconocida')              
              .replace('{molestia_ap}', selectedCase.molestia_ap || 'desconocida')
              .replace('{enfermedadescronicas_ar}', selectedCase.enfermedadescronicas_ar || 'desconocida')
              .replace('{alergias_ar}', selectedCase.alergias_ar || 'desconocida')
              .replace('{antecedentes_ar}', selectedCase.antecedentes_ar || 'desconocida')
              .replace('{habitos_ar}', selectedCase.habitos_ar || 'desconocida')
              .replace('{higiene_ar}', selectedCase.higiene_ar || 'desconocida')
              .replace('{medicamentos_ar}', selectedCase.medicamentos_ar || 'desconocida')
              .replace('{nombre_pv}', selectedCase.nombre_pv || 'desconocido')
              .replace('{fecha_nacimiento}', selectedCase.fecha_nacimiento ? this.formatDate(selectedCase.fecha_nacimiento) : 'desconocida')
              .replace('{edad}', selectedCase.fecha_nacimiento ? this.calculateAge(selectedCase.fecha_nacimiento) : 'edad desconocida')
              .replace('{nacionalidad}', selectedCase.nacionalidad || 'desconocida')
              .replace('{telefono}', selectedCase.telefono || 'desconocido')
              .replace('{actividad}', selectedCase.actividad || 'desconocida')
              .replace('{genero}', selectedCase.genero || 'desconocido')
              .replace('{direccion}', selectedCase.direccion || 'desconocida')
              .replace('{rut}', selectedCase.rut || 'desconocido')
              .replace('{examenes}', selectedCase.examenes || 'desconocido')
              .replace('{intraoral}', selectedCase.examen_intraoral || 'desconocido')
              .replace('{extraoral}', selectedCase.examen_extraoral || 'desconocido')
          }
          return responseTemplate;
        }
      }
    }

    return null; // Respuesta por defecto si no se encuentra ninguna coincidencia
  }

  public markCategoryCompleted(category: string): void {
    switch (category) {
      // Datos del paciente
      case 'nombre':
      case 'fechaNacimiento':
      case 'raza':
      case 'telefono':
      case 'actividad':
      case 'genero':
      case 'direccion':
      case 'rut':
        this.patientDataChecklist[category] = true;
        // Verifica si todos los datos del paciente están completos
        this.checklist.datosPaciente = Object.values(this.patientDataChecklist).every(value => value);
        break;
  
      // Anamnesis próxima
      case 'sintomas_ap':
      case 'molestia_ap':
        this.anamnesisProximaChecklist[category] = true;
        this.checklist.anamnesisProxima = Object.values(this.anamnesisProximaChecklist).every(value => value);
        break;
  
      // Anamnesis remota
      case 'enfermedadescronicas_ar':
      case 'alergias_ar':
      case 'medicamentos_ar':
      case 'antecedentes_ar':
      case 'habitos_ar':
      case 'higiene_ar':
        this.anamnesisRemotaChecklist[category] = true;
        this.checklist.anamnesisRemota = Object.values(this.anamnesisRemotaChecklist).every(value => value);
        break;
  
      // Otras categorías
      case 'saludo':
      case 'saludo2':
        this.checklist.saludo = true;
        break;
  
      case 'motivoConsulta':
        this.checklist.motivoConsulta = true;
        break;
  
      case 'extraoral':
        this.checklist.examenExtraoral = true;
        break;
  
      case 'intraoral':
        this.checklist.examenIntraoral = true;
        break;
  
      case 'examenes':
        this.checklist.examenes = true;
        break;
  
      case 'hipotesisDiagnostica':
        this.checklist.hipotesisDiagnostica = true;
        break;
  
      default:
        break;
    }
  }
  

  calculateScore(): number {
    let score = 0;
    for (const category in this.checklist) {
      if (this.checklist[category]) {
        score += this.categoryWeights[category];
      }
    }
    return Math.round(score * 100); // Devuelve el puntaje como porcentaje
  }

  getChecklistStatus(): Checklist {
    return this.checklist;
  }

}