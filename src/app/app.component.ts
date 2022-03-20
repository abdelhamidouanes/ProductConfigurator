import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoutingService } from './Services/routingService.service';
import { miliSecondQping, noFooterPaths, noHeaderPaths, noQpingPaths, noTopBarPaths, imgFolder } from './Shared/Constantes';
import { RetreiveHttpDataService } from './Services/retreiveHttpData.service';
import { PopUpService } from './Services/popUp.service';
import { LoadingService } from './Services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  

  imgFolder = imgFolder;

  //Variable to get no footer paths
  noFooterPaths= noFooterPaths;

  //Variable to get noheader paths
  noHeaderPaths= noHeaderPaths;

  //Variable to get noTopBar paths
  noTopBarPaths= noTopBarPaths;

  //Variables used to get the current page from routingService service
  actualPage: string;
  actualPageSubscription: Subscription;

  noQpingPaths = noQpingPaths;

  responseQPING: any;
  responseQPINGSubscription : Subscription; 

  popUp: boolean;
  popUpSubscription : Subscription;


  loading : boolean;
  loadingSubscription : Subscription;

  responseOptions: any;
  responseOptionsSubscription : Subscription;

  constructor(private routingService: RoutingService,
              private retreiveHttpDataService: RetreiveHttpDataService,
              private popUpService: PopUpService,
              private loadingService: LoadingService){

    this.loading = false;
    this.loadingSubscription = this.loadingService.loadingSubject.subscribe(data => {
      this.loading = data;
    });
    this.loadingService.emitLoading();

    this.popUp = false;
    this.popUpSubscription = this.popUpService.popUpSubject.subscribe((data: any)=>{
      this.popUp = data;
    });
    this.popUpService.emitPopUp();

    this.actualPage = '';
    this.actualPageSubscription = this.routingService.actualPageSubject.subscribe(
      actualPage => this.actualPage = actualPage
    );
    this.routingService.emitActualPage();

    this.responseQPINGSubscription = this.retreiveHttpDataService.responseQPINGSubject.subscribe(
      data =>{
        this.responseQPING = data;
      } 
    );
    this.retreiveHttpDataService.emitResponseQPING();
    this.qPing();

    this.responseOptionsSubscription = this.retreiveHttpDataService.responseOptionsSubject.subscribe(data => {
      this.responseOptions = data;
    });
    this.retreiveHttpDataService.emitResponseOptions();


  }


  ngOnInit(): void {
    this.loadingService.displayLoading();
  }

  ngAfterViewInit(): void{
    this.loadingService.unDisplayLoading();
  }

  ngOnDestroy(): void {
    this.actualPageSubscription.unsubscribe();
    this.responseQPINGSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
    this.popUpSubscription.unsubscribe();
    this.responseOptionsSubscription.unsubscribe();
  }

  qPing() : void {
    setInterval(async ()=>{
      if(!this.noQpingPaths.includes(this.actualPage)){
          if(this.responseQPING.ERRCODE== null || this.responseQPING.ERRCODE==''){
            await this.retreiveHttpDataService.lunchQping();
          } 
      } 
    }, miliSecondQping);
  } 

}
