import { Component, Input, OnInit } from '@angular/core';
import { RetreiveHttpDataService } from '../Services/retreiveHttpData.service';

@Component({
  selector: 'app-warning-msg',
  templateUrl: './warning-msg.component.html',
  styleUrls: ['./warning-msg.component.css']
})
export class WarningMsgComponent{


  @Input() msg= ''; 

  constructor(private retreiveHttpDataService: RetreiveHttpDataService) { }

  onClick(): void{
    this.retreiveHttpDataService.responseOptions.ErrorCode='';
    this.retreiveHttpDataService.emitResponseOptions();
  } 

}
