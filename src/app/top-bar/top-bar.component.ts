import { RoutingService } from './../Services/routingService.service';
import { RetreiveHttpDataService } from './../Services/retreiveHttpData.service';
import { Component, OnDestroy } from '@angular/core';
import { imgFolderFlags, noChangeLanguage } from '../Shared/Constantes';
import { Subscription } from 'rxjs';
import { PopUpService } from '../Services/popUp.service';
import { LoadingService } from '../Services/loading.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnDestroy {

  responseInfos: any;
  responseInfosSubscription  : Subscription;
  responseOptions: any;
  responseOptionsSubscription  : Subscription;
  responseContent : any;
  responseContentSubscription  : Subscription;
  responseMemos : any;
  responseMemosSubscription  : Subscription;
  responseImages : any;
  responseImagesSubscription  : Subscription;
  responseObjects : any;
  responseObjectsSubscription  : Subscription;
  responseSpecs : any;
  responseSpecsSubscription  : Subscription;
  responseHelps : any;
  responseHelpsSubscription  : Subscription;
  responseLangs : any;
  responseLangsSubscription  : Subscription;
  responseDefaultIntro : any;
  responseDefaultIntroSubscription  : Subscription;
  topBar : any;
  topBarSubscription  : Subscription;

  actualPage: string;
  actualPageSubscription : Subscription;
  
  noChangeLanguage = noChangeLanguage;

  tooltipVisible : Map<any, any> = new Map();


  ngOnDestroy(): void {
    this.responseInfosSubscription.unsubscribe();
    this.responseOptionsSubscription.unsubscribe();
    this.responseContentSubscription.unsubscribe();
    this.responseMemosSubscription.unsubscribe();
    this.responseImagesSubscription.unsubscribe();
    this.responseObjectsSubscription.unsubscribe();
    this.responseSpecsSubscription.unsubscribe();
    this.responseHelpsSubscription.unsubscribe();
    this.responseLangsSubscription.unsubscribe();
    this.responseDefaultIntroSubscription.unsubscribe();
    this.topBarSubscription.unsubscribe();
    this.actualPageSubscription.unsubscribe();
  }

  constructor(private retreiveHttpDataService: RetreiveHttpDataService, 
              private popUpService: PopUpService,
              private loadingService: LoadingService,
              private routingService: RoutingService) {

      this.responseInfosSubscription = this.retreiveHttpDataService.responseInfosSubject.subscribe(data => {
        this.responseInfos = data;
      });
      this.retreiveHttpDataService.emitResponseInfos();


      this.responseOptionsSubscription = this.retreiveHttpDataService.responseOptionsSubject.subscribe(data => {
        this.responseOptions = data;
        if(!Array.isArray(this.responseOptions.progression.famname)){
            this.responseOptions.progression.famname = [this.responseOptions.progression.famname];
        }
      });
      this.retreiveHttpDataService.emitResponseOptions();


      this.responseContentSubscription = this.retreiveHttpDataService.responseContentSubject.subscribe(data => {
        this.responseContent = data;
      });
      this.retreiveHttpDataService.emitResponseContent();


      this.responseMemosSubscription = this.retreiveHttpDataService.responseMemosSubject.subscribe(data => {
        this.responseMemos = data;
      });
      this.retreiveHttpDataService.emitResponseMemos();


      this.responseImagesSubscription = this.retreiveHttpDataService.responseImagesSubject.subscribe(data => {
        this.responseImages = data;
      });
      this.retreiveHttpDataService.emitResponseImages();


      this.responseObjectsSubscription = this.retreiveHttpDataService.responseObjectsSubject.subscribe(data => {
        this.responseObjects = data;
      });
      this.retreiveHttpDataService.emitResponseObjects();

      
      this.responseSpecsSubscription = this.retreiveHttpDataService.responseSpecsSubject.subscribe(data => {
        this.responseSpecs = data;
      });
      this.retreiveHttpDataService.emitResponseSpecs();


      this.responseHelpsSubscription = this.retreiveHttpDataService.responseHelpsSubject.subscribe(data => {
        this.responseHelps = data;
      });
      this.retreiveHttpDataService.emitResponseHelps();


      this.responseLangsSubscription = this.retreiveHttpDataService.responseLangsSubject.subscribe(data => {
        this.responseLangs = data;
      });
      this.retreiveHttpDataService.emitResponseLangs();


      this.responseDefaultIntroSubscription = this.retreiveHttpDataService.responseDefaultIntroSubject.subscribe(data => {
        this.responseDefaultIntro = data;
      });
      this.retreiveHttpDataService.emitResponseDefaultIntro();

      this.topBarSubscription = this.retreiveHttpDataService.topBarSubject.subscribe(data => {
        this.topBar = data;
      });
      this.retreiveHttpDataService.emitTopBar();

      this.actualPage ='';
      this.actualPageSubscription = this.routingService.actualPageSubject.subscribe( data => {
        this.actualPage = data;
      });
      this.routingService.emitActualPage();
  }


  getFlagImg(code: any): string {
    return imgFolderFlags+code+'.png';
  }

  async itemClick(data: any) {
    let item = data.itemData;
    if(item.type != null){
        this.loadingService.displayLoading();
        this.popUpService.newTitle(item.name);
        this.popUpService.newType(item.type);
        await this.retreiveHttpDataService.getResponseForTopBarRequest(item.file, item.type);
        this.popUpService.displayPopUp();
    }
  }


  onLanguageSelection(event: any): void{
    if(event.selectedItem.Code!=this.responseOptions.Lang){
      this.loadingService.displayLoading();
      this.routingService.processClick('ChangeLanguage', event.selectedItem.Code);
    }
  }

      //function for tooltip 
  toggleDefault(i: number) {
        this.tooltipVisible.set(i, this.tooltipVisible.get(i)!=null? (!this.tooltipVisible.get(i)) : true );
  }


  onItemClickProgressionBar(i: number) {
    this.loadingService.displayLoading();
    this.routingService.processClick('ProgressionBar',''+i);
  }

  indexFirstMiniscule(chaine : string): number{
    let result = -1;
    for (let i=0; i< chaine.length; i++) 
    {
      if(chaine[i].toLowerCase() === chaine[i] && result<0){
        result = i;
      }
    }
    return result;
  }

}
