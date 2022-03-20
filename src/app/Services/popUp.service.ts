import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {


  private popUp : boolean;
  popUpSubject = new Subject<boolean>();  

  private title: string;
  titleSubject = new Subject<string>(); 

  private type: string;
  typeSubject = new Subject<string>(); 

  constructor() {
    this.popUp = false;
    this.title = '';
    this.type = '';
  }


  emitPopUp(): void{
      this.popUpSubject.next(this.popUp);
  }

  emitTitle(): void{
    this.titleSubject.next(this.title);
  }

  emitType(): void{
    this.typeSubject.next(this.type);
  }

  displayPopUp(): void{
    this.popUp = true;
    this.emitPopUp();
  }

  unDisplayPopUp(): void{
    this.popUp = false;
    this.emitPopUp();
  }

  resetTitle(): void{
    this.title = '';
    this.emitTitle();
  }

  newTitle(title: string): void{
    this.title = title;
    this.emitTitle();
  }


  resetType(): void{
    this.type= '';
    this.emitType();
  }

  newType(type: string): void{
    this.type = type;
    this.emitType();
  }

}
