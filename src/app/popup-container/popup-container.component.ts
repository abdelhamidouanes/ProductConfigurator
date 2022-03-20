import { RetreiveHttpDataService } from './../Services/retreiveHttpData.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PopUpService } from '../Services/popUp.service';
import { maxZoomIn, maxZoomOut, realImgMapProportion, stepBtnZoom, stepMouseWheelZoom, stepSliderZoom } from '../Shared/Constantes';

@Component({
  selector: 'app-popup-container',
  templateUrl: './popup-container.component.html',
  styleUrls: ['./popup-container.component.css']
})
export class PopupContainerComponent implements OnInit, OnDestroy {

  responseForTopBarRequest: any;
  responseForTopBarRequestSubscription : Subscription;

  type: string;
  typeSubscription: Subscription;

  title: string;
  titleSubscription: Subscription;

  maxZoomIn= maxZoomIn;
  maxZoomOut= maxZoomOut;
  stepBtnZoom = stepBtnZoom;
  stepSliderZoom = stepSliderZoom;
  stepMouseWheelZoom = stepMouseWheelZoom;
  realImgMapProportion = realImgMapProportion;
  
  constructor(private popUpService: PopUpService, private retreiveHttpDataService : RetreiveHttpDataService) {

    this.type = '';
    this.title = '';


    this.typeSubscription = this.popUpService.typeSubject.subscribe((data: any)=> {
      this.type = data;
    });
    this.popUpService.emitType();

    this.titleSubscription = this.popUpService.titleSubject.subscribe((data: any)=> {
      this.title = data;
    });
    this.popUpService.emitTitle();

    this.responseForTopBarRequestSubscription = this.retreiveHttpDataService.responseForTopBarRequestSubject.subscribe((data : any) => {
      this.responseForTopBarRequest = data;
    });
    this.retreiveHttpDataService.emitResponseForTopBarRequest();
  }
   
   

  ngOnDestroy(): void {
    this.responseForTopBarRequestSubscription.unsubscribe();
    this.typeSubscription.unsubscribe();
    this.titleSubscription.unsubscribe();
  }
  
  ngOnInit(): void {
  }


  onXClick(): void{
    this.popUpService.unDisplayPopUp();
    this.popUpService.resetTitle();
    this.popUpService.resetType();
  } 


}
