import { RetreiveHttpDataService } from './../Services/retreiveHttpData.service';
import { RoutingService } from './../Services/routingService.service';
import { imgFolder } from './../Shared/Constantes';
import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../Services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {


  imgFolder = imgFolder;
  loading : boolean;
  loadingSubscription : Subscription;

  constructor(private routingService: RoutingService, 
              private retreiveHttpDataService: RetreiveHttpDataService,
              private loadingService: LoadingService) {
        
      this.loading = false;
      this.loadingSubscription = this.loadingService.loadingSubject.subscribe(data => {
        this.loading = data;
      });
      this.loadingService.emitLoading();
  }
  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  ngAfterViewInit(): void{
    this.loadingService.unDisplayLoading();
  }

  onSubmit(form: NgForm){
    this.loadingService.displayLoading();
    const username = form.value['username']; 
    const password = form.value['password']; 
    const startingcata = form.value['startingcata'];
    const startingident = form.value['startingident']; 
    const connexionParams = {'username' : username, 'password' : password, 'startingcata': startingcata, 'startingident': startingident }
    this.routingService.processClick('Login', connexionParams);
  } 
}
