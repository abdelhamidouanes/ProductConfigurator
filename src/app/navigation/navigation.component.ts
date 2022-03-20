import { RetreiveHttpDataService } from './../Services/retreiveHttpData.service';
import { FilterSearchService } from './../Services/filtersSearch.service';
import { iconsNavigationCatalogs, imgFolder } from './../Shared/Constantes';
import { FooterService } from './../Services/footer.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoutingService } from '../Services/routingService.service';
import { NavigationButton } from 'src/TechnicalModels/NavigationButton.model';
import { navigationButtons } from '../Shared/Constantes';
import { LoadingService } from '../Services/loading.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnDestroy {

  imgFolder= imgFolder;

  //Variables used to get the current page from routingService service
  actualPage: string;
  actualPageSubscription: Subscription;

  //Variable to get navigation buttons from NavigationFooterService
  navigationButtons: NavigationButton[];
  navigationButtonsSubscription : Subscription;


  iconsNavigationCatalogs = iconsNavigationCatalogs;

  constructor(private routingService: RoutingService,
              private footerService: FooterService,
              private filterSearchService: FilterSearchService,
              public retreiveHttpDataService: RetreiveHttpDataService,
              private loadingService: LoadingService
              ){
    
    //Initializing and subscription to RoutingService : actualPageSubject
    this.actualPage = '';
    this.actualPageSubscription = this.routingService.actualPageSubject.subscribe(
      actualPage => this.actualPage = actualPage
    );
    this.routingService.emitActualPage();

    //Initializing and subscription to NavigationFooterService : navigationButtons
    this.navigationButtons = navigationButtons;
    this.navigationButtonsSubscription = this.footerService.navigationButtonsSubject.subscribe(data => {
      this.navigationButtons = data;
    });
    this.footerService.emitNavigationButtons();

  }


  ngOnDestroy(): void {
    this.actualPageSubscription.unsubscribe();
    this.navigationButtonsSubscription.unsubscribe();
  }

  //function called when a link is clicked, it takes the path as a parameter and modifie the actualPage in the routingService service to rich the link
  onNavigateTo(clicked: string): void {
    this.loadingService.displayLoading();
    this.routingService.processClick(clicked,'');
  }
}
