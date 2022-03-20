import { RetreiveHttpDataService } from './../Services/retreiveHttpData.service';
import { RoutingService } from './../Services/routingService.service';
import { Component, Input, OnInit } from '@angular/core';
import { firstPageToload } from '../Shared/Constantes';

@Component({
  selector: 'app-alert-msg',
  templateUrl: './alert-msg.component.html',
  styleUrls: ['./alert-msg.component.css']
})
export class AlertMsgComponent implements OnInit {

  @Input() title= '';
  @Input() msg= ''; 



  constructor(private routingService: RoutingService, private retreiveHttpDataService: RetreiveHttpDataService) { }

  ngOnInit(): void {
  }

  onClick(): void{
    this.routingService.setActualPage(firstPageToload);
    this.retreiveHttpDataService.resetResponseQping();
  } 


}
