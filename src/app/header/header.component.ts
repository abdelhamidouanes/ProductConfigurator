import { constHeader } from './../Shared/Constantes';
import { Header } from './../../TechnicalModels/Header.model';
import { HeaderService } from './../Services/header.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  header: Header;
  headerSubscription : Subscription;

  //Get header while constructing the HeaderComponent using HeaderService
  constructor(private headerService : HeaderService) {
    this.header = constHeader;
    this.headerSubscription = this.headerService.headerSubject.subscribe(data => {
      this.header = data;
    } );
    this.headerService.emitHeader();
    
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.headerSubscription.unsubscribe();
  }

}
