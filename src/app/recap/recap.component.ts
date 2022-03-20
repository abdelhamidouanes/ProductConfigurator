import { Subscription } from 'rxjs';
import { RetreiveHttpDataService } from './../Services/retreiveHttpData.service';
import { Component, OnDestroy } from '@angular/core';
import { LoadingService } from '../Services/loading.service';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']
})
export class RecapComponent implements OnDestroy {


  designation : string ='';

  subforms: any;
  subformsSubscription: Subscription; 

  data: any;
  dataSubscription: Subscription;


  partsA_PARTPANEL : any;
  partsA_PARTPANELSubscription : Subscription;

  constructor(private retreiveHttpDataService: RetreiveHttpDataService,
              private loadingService: LoadingService) { 

    this.subformsSubscription= this.retreiveHttpDataService.contentA_GOCONSPANELSubject.subscribe(data =>{
      this.designation = data.Desi;
      this.subforms = data.subforms;
    } );
    this.retreiveHttpDataService.emitContentA_GOCONSPANEL();

    this.dataSubscription = this.retreiveHttpDataService.criteriaA_CONSUPDERGOSubject.subscribe(data =>{
      this.data = data ;
    } );
    this.retreiveHttpDataService.emitCriteriaA_CONSUPDERGO();

    this.partsA_PARTPANELSubscription = this.retreiveHttpDataService.partsA_PARTPANELSubject.subscribe(data => {
      this.partsA_PARTPANEL = data;
    });
    this.retreiveHttpDataService.emitPartsA_PARTPANEL();

  }
  ngOnDestroy(): void {
    this.partsA_PARTPANELSubscription.unsubscribe();
    this.subformsSubscription.unsubscribe();
    this.dataSubscription.unsubscribe();
  }

  objectContainParameter(object: any, parameter: any): boolean{
    let result = false;
    let parameters = this.toArray(object.parameters);
    parameters.forEach((item: any) => {
      if(parameter.Code==item.Code){
        result = true;
      } 
    });
    return result;
  } 

  toArray(object: any): any{
    if(Array.isArray(object)){
      return object
    }else{
      let array : any[]=[];
      array[0]= object;
      return array;
    }
  }



  ngAfterViewInit(): void{
    this.loadingService.unDisplayLoading();
  }


}
