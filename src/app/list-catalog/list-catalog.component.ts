import { RoutingService } from './../Services/routingService.service';
import { FooterService } from './../Services/footer.service';
import { imgFolder } from './../Shared/Constantes';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RetreiveHttpDataService } from '../Services/retreiveHttpData.service';
import { LoadingService } from '../Services/loading.service';

@Component({
  selector: 'app-list-catalog',
  templateUrl: './list-catalog.component.html',
  styleUrls: ['./list-catalog.component.css']
})
export class ListCatalogComponent implements OnDestroy {

    catalogues: any[];
    catalogueSubscription : Subscription;
    imgFolder = imgFolder;


  constructor(private retreiveHttpDataService: RetreiveHttpDataService, 
              private footerService: FooterService, 
              private routingService: RoutingService,
              private loadingService: LoadingService) {
    //Initialising variables
    this.catalogues=[]; 
    this.catalogueSubscription = new Subscription();

    //subscription to the icon subject then emit data 
      this.catalogueSubscription = this.retreiveHttpDataService.catalogueSubject.subscribe(
        (data: any) => this.catalogues = data
      );
      this.retreiveHttpDataService.emitCatalogues();

   }
  ngOnDestroy(): void {
    this.catalogueSubscription.unsubscribe();
  }


  ngAfterViewInit(): void{
    this.loadingService.unDisplayLoading();
  }

  onCatalogSelection(selectedCatalog: any){
    this.retreiveHttpDataService.catalogueSelectedInCatalogueList = selectedCatalog[0].Code.toUpperCase();
    this.footerService.activationButton('C');
  } 

  onDoubleClickCatalogSelection(catalog: any){
    this.loadingService.displayLoading();
    this.retreiveHttpDataService.catalogueSelectedInCatalogueList = catalog.toUpperCase();
    this.footerService.activationButton('C');
    this.routingService.processClick('OpenCatalogue','');
  }
  
}
