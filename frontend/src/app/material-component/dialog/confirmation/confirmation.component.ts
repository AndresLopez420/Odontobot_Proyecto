import { Component, EventEmitter, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  onEmitStatusChange = new EventEmitter();
  details:any ={};
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any){}

  ngOnInit(): void{
    if(this.dialogData){
      this.details = this.dialogData;
    }
  }

  handleChangeAction(){
    this.onEmitStatusChange.emit();    
  }

}
