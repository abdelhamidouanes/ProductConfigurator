import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {


  private loading : boolean;
  loadingSubject = new Subject<boolean>();  

 

  constructor() {
    this.loading = false;
  }


  emitLoading(): void{
      this.loadingSubject.next(this.loading);
  }

  displayLoading(): void{
    this.loading = true;
    this.emitLoading();
  }

  unDisplayLoading(): void{
    this.loading = false;
    this.emitLoading();
  }

}
