import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EntrevistaService } from 'src/app/services/entrevista.service';
import { BotResponseService } from '../services/bot-response.service';
import { InstanciaStatusService } from 'src/app/services/instancia-status.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CasoService } from 'src/app/services/caso.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

interface Message {
  from: 'user' | 'bot' | 'system';
  text: string;
  images?: string[];
}

interface CasoClinico {
  // Datos del caso clínico
  id_caso: number;
  id_profesor: string;
  nombre_caso: string;
  dificultad: string;
  instancia: string;
  modulo: string;
  clase: string;
  patologia: string;
  motivo_consulta: string;
  ultima_visita: string;
  sintomas_ap: string;
  molestia_ap: string;
  enfermedadescronicas_ar: string;
  alergias_ar: string;  
  medicamentos_ar: string;
  antecedentes_ar: string;
  habitos_ar: string;
  higiene_ar: string;
  examenes: string[];
  examen_intraoral: string[];
  examen_extraoral: string[];
  
  // Datos del paciente virtual (ahora incluidos en el mismo objeto)
  id_paciente?: number;
  nombre_pv?: string;
  fecha_nacimiento?: string;
  nacionalidad?: string;
  telefono?: string;
  actividad?: string;
  genero?: string;
  direccion?: string;
  rut?: string;
}


@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})

export class ChatbotComponent implements OnInit {
  caseData: CasoClinico[] = [];
  messages: Message[] = [];
  userInput: string = '';
  goodResponseCount: number = 0;
  badResponseCount: number = 0;
  userResponses: string[] = [];
  selectedCase: CasoClinico | null = null;
  diagnosisInput: string = '';
  showInterviewSummary: boolean = false; // Controla si se muestra el resumen
  checklist: any = {}; // Estado del checklist
  checklistKeys: string[] = []; // Claves del checklist
  score: number = 0; // Puntaje final
  isInputDisabled: boolean = false; // Controla si el cuadro de entrada está deshabilitado
  isBotTyping: boolean = false;
  summaryClass: string = '';
  displayNames: { [key: string]: string };

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  
  constructor(
    private router: Router,
    private entrevistaService: EntrevistaService,    
    private instanciaStatusService: InstanciaStatusService,
    private botResponseService: BotResponseService,
    private dialog: MatDialog, // Inyección de MatDialo
    private sanitizer: DomSanitizer,
    private casoService: CasoService,
    private snackbarService:SnackbarService
  ) {
    this.displayNames = this.botResponseService.displayNames;
  }

  ngOnInit() {
    this.loadCaseData();
    // Suscribirse al cambio de id_caso
    this.casoService.currentIdCaso.subscribe(id_caso => {
      if (id_caso !== null) {
        this.loadCaseData(id_caso); // Llama a loadCaseData con el nuevo id_caso
        console.log('ID:', id_caso);
      }
    });
  }

  getSafeHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  loadCaseData(idCaso?: number) {
    const id = idCaso || 1; // ID del caso
    this.casoService.saveIdCasoToLocalStorage(id);
    this.entrevistaService.getCasoCompleto(id).subscribe({
      next: (data) => {
        this.selectedCase = data;
        // Formatear las imágenes si existen
        if (this.selectedCase?.examenes) {
          this.selectedCase.examenes = this.selectedCase.examenes.map(examen => {
            if (this.isImage(examen)) {
              return this.entrevistaService.getImageUrl(examen);
            }
            return examen;
          });
        }
      },
      error: (err) => console.error('Error al cargar caso clínico:', err)
    });
  }
  
  private isImage(filename: string): boolean {
    return /\.(jpg|jpeg|png|gif)$/i.test(filename);
  }

  private getAllCaseClinics(): string {
    if (this.caseData.length === 0) {
      return "No hay casos clínicos disponibles.";
    }

    let response = "Aquí están todos los casos clínicos:\n";
    this.caseData.forEach((caseItem, index) => {
      response += `Caso ${index + 1}: ${caseItem.nombre_caso} (Dificultad: ${caseItem.dificultad}, Instancia: ${caseItem.instancia})\n`;
    });
    return response;
  }

  sendMessage() {
    if (this.userInput.trim()) {
    
      this.messages.unshift({ from: 'user', text: this.userInput });
      this.userResponses.push(this.userInput);
      const userMessage = this.userInput;
      this.userInput = '';
      this.scrollToBottom();
      this.generateBotResponse(userMessage);
    }
  }

  private generateBotResponse(userMessage: string) {
    this.messages.unshift({ from: 'bot', text: ''});
    this.isBotTyping = true;
    this.scrollToBottom();
  
    setTimeout(() => {
      this.isBotTyping = false;
      const botMessage = this.botResponseService.getBotResponse(userMessage, this.selectedCase); // Aquí se pasa el selectedCase
      
      if (botMessage) {
        this.messages[0].text = botMessage;
      } else {
        this.messages[0].text = 'Disculpe, no entendí su pregunta.';
      }
  
      this.scrollToBottom();
  
      if (botMessage) {
        this.goodResponseCount++;
      } else {
        this.badResponseCount++;
      }
    }, 1000);
  }
  

  selectCaseById(id_caso: number) {
    this.selectedCase = this.caseData.find(caseItem => caseItem.id_caso === id_caso) || null;
  }

  private scrollToBottom() {
    setTimeout(() => {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }, 100);
  }

 
  addSystemMessage(text: string) {
  this.messages.unshift({ from: 'system', text });
  this.scrollToBottom();
  }

  

  checkDiagnosisCompletion() {
    if (this.diagnosisInput.trim()) {
      // Marcar la hipótesis diagnóstica como completada
      this.botResponseService.markCategoryCompleted('hipotesisDiagnostica');
      console.log('Diagnóstico ingresado:', this.diagnosisInput);
    }
  }
  

  finishInterview() {
    // Verificar si el diagnóstico está completado
    this.checkDiagnosisCompletion();
  
    // Obtén el estado del checklist y el puntaje final
    this.checklist = this.botResponseService.getChecklistStatus();
    this.checklistKeys = Object.keys(this.checklist);
    this.score = this.botResponseService.calculateScore();
  
    // Muestra el resumen
    this.showInterviewSummary = true;
  
    // Deshabilitar el cuadro de entrada
    this.isInputDisabled = true;
  
    // Lógica para establecer el estado del resumen
    const isCompleted = Object.values(this.checklist).every(value => value);
    console.log('Checklist completado:', isCompleted); // Verifica el estado
    this.summaryClass = isCompleted ? 'completed' : 'pending';

    this.snackbarService.openSnackBar(`Interacciones almacenadas en tabla "Entrevista"`, "success");
  }
  
  
  
  
  
}