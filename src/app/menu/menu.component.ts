import { RoutingService } from './../Services/routingService.service';
import { imgFolder } from './../Shared/Constantes';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  imgFolder = imgFolder;
  constructor(private routingService: RoutingService) { }

  ngOnInit(): void {
  }
  
  //function called when a link is clicked, it takes the path as a parameter and modifie the actualPage in the routingService service to rich the link
  onClick(clicked: string): void {
    this.routingService.processClick(clicked, '');
  }

}
