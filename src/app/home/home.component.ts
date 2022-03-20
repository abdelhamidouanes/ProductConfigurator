import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoutingService } from '../Services/routingService.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  actualPage: string;
  actualPageSubscription: Subscription; 


  constructor(private routingService: RoutingService){
    this.actualPage = '';
    this.actualPageSubscription = this.routingService.actualPageSubject.subscribe(
      actualPage => this.actualPage = actualPage
    );
    this.routingService.emitActualPage();

  }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    this.actualPageSubscription.unsubscribe();
  }

}
