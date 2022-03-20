import { HeaderService } from './../Services/header.service';
import { RoutingService } from './../Services/routingService.service';
import { Icon } from '../Models/Icon.model';
import { Component, OnDestroy} from '@angular/core';
import { RetreiveHttpDataService } from '../Services/retreiveHttpData.service';
import { Subscription }  from  'rxjs';
import { LoadingService } from '../Services/loading.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnDestroy {

  icons: Icon[];
  iconsSubscription : Subscription;


  
  constructor(private retreiveHttpDataService: RetreiveHttpDataService, 
              private routingService: RoutingService,
              private headerService : HeaderService,
              private loadingService: LoadingService) {
    
    //Initialising variables
    this.icons=[]; 
    this.iconsSubscription = new Subscription();

    //subscription to the icon subject then emit data 
      this.iconsSubscription = this.retreiveHttpDataService.iconsSubject.subscribe(
        (data) => this.icons = data
      );
      this.retreiveHttpDataService.emitIcons();

  }
  
  ngOnDestroy(): void {
    this.iconsSubscription.unsubscribe();
  }

  ngAfterViewInit(): void{
    this.loadingService.unDisplayLoading();
  }

  //function called when a link is clicked, it takes the path as a parameter and modifie the actualPage in the routingService service to rich the link
  onClick(clicked: string, parameter: any): void {
    this.loadingService.displayLoading();
    this.routingService.processClick(clicked, parameter);
  }

}
