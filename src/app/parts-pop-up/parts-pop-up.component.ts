import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from '../Services/loading.service';
import { RetreiveHttpDataService } from '../Services/retreiveHttpData.service';
import { RoutingService } from '../Services/routingService.service';

@Component({
  selector: 'app-parts-pop-up',
  templateUrl: './parts-pop-up.component.html',
  styleUrls: ['./parts-pop-up.component.css']
})
export class PartsPopUpComponent implements OnDestroy {


  selectedPartCode : string;

  partsA_PARTPANEL : any;
  partsA_PARTPANELSubscription : Subscription;

  responseDefaultIntro: any;
  responseDefaultIntroSubscription: Subscription;
  
  constructor(private routingService: RoutingService, 
              private retreiveHttpDataService: RetreiveHttpDataService,
              private loadingService: LoadingService) {

    this.partsA_PARTPANELSubscription = this.retreiveHttpDataService.partsA_PARTPANELSubject.subscribe(data => {
      this.partsA_PARTPANEL = data;
    });
    this.retreiveHttpDataService.emitPartsA_PARTPANEL();


    this.responseDefaultIntroSubscription = this.retreiveHttpDataService.responseDefaultIntroSubject.subscribe( data => {
      this.responseDefaultIntro = data;
    });
    this.retreiveHttpDataService.emitResponseDefaultIntro();

    this.selectedPartCode='';

  }

  ngOnDestroy(): void {
    this.partsA_PARTPANELSubscription.unsubscribe();
    this.responseDefaultIntroSubscription.unsubscribe();
  }

  onXClick(): void{
    this.retreiveHttpDataService.resetPartsA_PARTPANEL();
  } 

  getPart(): void{
    this.loadingService.displayLoading();
    this.routingService.processClick('Part', this.selectedPartCode);
    this.retreiveHttpDataService.resetPartsA_PARTPANEL();
  }

  onPartSelection(selectedPart: any){
    this.selectedPartCode = selectedPart[0].Code;
  } 

  onDoubleClickPartSelection(part: any){
    this.loadingService.displayLoading();
    this.selectedPartCode = part;
    this.getPart();
  }

}
