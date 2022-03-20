import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()

export class ConfiguratorDisplayService {

  private subformDisplay: Map<string, boolean>;
  subformDisplaySubject: Subject<Map<string, boolean>>;

  private extentionSubformDisplay: Map<string, boolean>;
  extentionSubformDisplaySubject: Subject<Map<string, boolean>>;

  private idSubform: string[];
  idSubformSubject : Subject<string[]>;

  private isFirstLoad: boolean;
  isFirstLoadSubject : Subject<boolean>;

  private isFirstLoadFilter: number;
  isFirstLoadFilterSubject : Subject<number>;

  filterEventSubject: Subject<any> = new Subject<any>();
  change : boolean = false;

  //Map to verify if the selectBox 
  private isSelectBoxOpen: Map<string, boolean>;
  isSelectBoxOpenSubject : Subject<Map<string, boolean>>;


  private laxModeMenuOpen : Map<string, boolean>;
  laxModeMenuOpenSubject : Subject<Map<string, boolean>>;

  constructor() { 
    this.subformDisplay = new Map();
    this.subformDisplaySubject = new Subject<Map<string, boolean>>();

    this.extentionSubformDisplay = new Map();
    this.extentionSubformDisplaySubject = new Subject<Map<string, boolean>>();

    this.idSubform = [];
    this.idSubformSubject = new Subject<string[]>();

    this.isFirstLoadFilter = 0;
    this.isFirstLoadFilterSubject = new Subject<number>();

    this.isFirstLoad = true;
    this.isFirstLoadSubject = new Subject<boolean>();

    this.isSelectBoxOpen = new Map();
    this.isSelectBoxOpenSubject = new Subject<Map<string, boolean>>();

    this.laxModeMenuOpen = new Map();
    this.laxModeMenuOpenSubject = new Subject<Map<string, boolean>>();

  }


  emitSubformDisplay(): void{
    this.subformDisplaySubject.next(this.subformDisplay);
  }

  emitExtentionSubformDisplay(): void{
    this.extentionSubformDisplaySubject.next(this.extentionSubformDisplay);
  }

  emitIdSubform(): void{
    this.idSubformSubject.next(this.idSubform);
  }

  emitIsFirstLoadFilter(): void{
    this.isFirstLoadFilterSubject.next(this.isFirstLoadFilter);
  }


  emitIsFirstLoad(): void{
    this.isFirstLoadSubject.next(this.isFirstLoad);
  }

  emitIsSelectBoxOpen(): void{
    this.isSelectBoxOpenSubject.next(this.isSelectBoxOpen);
  }

  emitLaxModeMenuOpen(): void{
    this.laxModeMenuOpenSubject.next(this.laxModeMenuOpen);
  }

  initIsFirstLoad(): void{
    this.isFirstLoad = true;
    this.emitIsFirstLoad();
  }

  isFirstLoadToFalse(): void{
    this.isFirstLoad = false;
    this.emitIsFirstLoad();
  }

  getIdSubform(index: number): string{
    if(this.idSubform[index]=='' || this.idSubform[index]==null){
      this.idSubform[index] = '' + index + '_' + Math.random().toString(36).substr(2, 9)
    }
    return this.idSubform[index];
  }

  displayUndisplaySubform(index: number): void{
    if(this.subformDisplay.get(this.getIdSubform(index))==null || this.subformDisplay.get(this.getIdSubform(index))==false){
      this.subformDisplay.set(this.getIdSubform(index), true);
    }
    else{
      this.subformDisplay.set(this.getIdSubform(index), false);
    }
    this.emitSubformDisplay();
  }

  displayUndisplayExtentionSubform(index: number): void{
    if(this.extentionSubformDisplay.get(this.getIdSubform(index))==null || this.extentionSubformDisplay.get(this.getIdSubform(index))==false){
      this.extentionSubformDisplay.set(this.getIdSubform(index), true);
    }
    else{
      this.extentionSubformDisplay.set(this.getIdSubform(index), false);
    }
    this.emitExtentionSubformDisplay();
  }

  displayFirstSubform(): void{
    this.subformDisplay.set(this.getIdSubform(0), true);
    this.emitSubformDisplay();
  }

  initDisplaySubform(): void{
    this.subformDisplay = new Map();
    this.emitSubformDisplay();
  }

  initDisplayExtentionSubform(): void{
    this.extentionSubformDisplay = new Map();
    this.emitExtentionSubformDisplay();
  }

  nextFilterEventSubject(element: any): void{
    this.filterEventSubject.next(element);
  }

  initIsFirstLoadFilter(): void{
    this.isFirstLoadFilter = 0;
    this.emitIsFirstLoadFilter();
  }

  incrementIsFirstLoadFilter(): void{
    this.isFirstLoadFilter++;
    this.emitIsFirstLoadFilter();
  }


  initIsSelectBoxOpen(): void{
    this.isSelectBoxOpen.clear();
    this.emitIsSelectBoxOpen();
  }

  //Function to assaign isSelectBoxOpen To False when the select box is closed
  setIsSelectBoxOpen(code:string, value: boolean): void{
      this.isSelectBoxOpen.set(code, value);
      this.emitIsSelectBoxOpen();
  } 


  openLaxModeMenu(code: string): void{
    if((this.laxModeMenuOpen.get(code)!=null) && (this.laxModeMenuOpen.get(code))){
      this.laxModeMenuOpen.set(code, false);
    } 
    else{
      this.laxModeMenuOpen.forEach((value, key)=> {
        this.laxModeMenuOpen.set(key,false);
      });
      this.laxModeMenuOpen.set(code, true);
    } 
  } 

  closeLaxModeMenu():void{
    this.laxModeMenuOpen.forEach((value, key)=> {
      this.laxModeMenuOpen.set(key,false);
    });
  } 

}
