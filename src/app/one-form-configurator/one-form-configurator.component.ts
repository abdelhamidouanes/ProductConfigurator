import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, OnDestroy, ViewChildren, QueryList, HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DxSelectBoxComponent } from 'devextreme-angular';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfiguratorDisplayService } from '../Services/configuratorDisplay.service';
import { FilterSearchService } from '../Services/filtersSearch.service';
import { FooterService } from '../Services/footer.service';
import { LoadingService } from '../Services/loading.service';
import { RetreiveHttpDataService } from '../Services/retreiveHttpData.service';
import { RoutingService } from '../Services/routingService.service';
import { nbrBullFullScreen, nbrBullScreen1000600, nbrBullScreen12001000, nbrBullScreen600 } from '../Shared/Constantes';

@Component({
  selector: 'app-one-form-configurator',
  templateUrl: './one-form-configurator.component.html',
  styleUrls: ['./one-form-configurator.component.css']
})
export class OneFormConfiguratorComponent implements OnInit, OnDestroy {


  @Input() formField: any;
  @Input() selectBoxData: any;


  @ViewChildren(DxSelectBoxComponent) selectBox!: QueryList<any>;

  defaultVisibleSelectBox : Map<any, any> = new Map();
  defaultVisible : Map<any, any> = new Map();
  randomIdSelectBox : Map<string, string> = new Map();
  randomId : Map<string, string> = new Map();
  defaultVisibleLaxMode : boolean = false;
  defaultVisibleLaxModeActive : Map<any, any> = new Map();


/* list of parameters the paging
  readonly allowedPageSizes: any = [5, 10, 20, 'All'];
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true; */

//Variable for the width of the SelectBox, unlike the input element mention width 100% do not make the select box stretch on all the parent element
  //So we have to calculate in pixels the width of the select box
  selectBoxWidth: number = 0;



  //Variable to be used as the "value" in the select box when an item is selected in the datagrid
  selectedItem: Map<string, string> = new Map();
  selectedItemSubscription : Subscription;


  //Variables to be used when search or filter
  filters: Map<string, any> = new Map();
  filtersSubscription: Subscription;

  

  //Map to give us the list of values displayed in bulls for each criteria
  bullSlice: Map<string, string[]> = new Map();


  //Map to verify if the selectBox 
  isSelectBoxOpen: Map<string, boolean>;
  isSelectBoxOpenSubscription : Subscription;


  //window width used for the absolute position of the select box
  windowWidth : number; 

  laxModeMenuOpen : Map<string, boolean>;
  laxModeMenuOpenSubscription : Subscription;

  laxModeActive: Map<string, boolean>;
  laxModeActiveSubscription: Subscription;

  nbrBullToBeDisplayed: number;

  apiLink = environment.apiLink;

  private datasASELUPDERGO: any; 
  datasASELUPDERGOSubscription : Subscription;

  formatedDatasASELUPDERGO: any;
  formatedDatasASELUPDERGOSubscription : Subscription;


  imgSelectionOpen: Map<string, boolean>;
  
  responseImgSelection: Map<string,any>;
  responseImgSelectionSubscription : Subscription;



  
  constructor(public retreiveHttpDataService: RetreiveHttpDataService, 
              private httpClient: HttpClient,
              private routingService: RoutingService,
              private filterSearchService: FilterSearchService,
              private loadingService: LoadingService,
              private footerService: FooterService,
              public configuratorDisplayService: ConfiguratorDisplayService) { 

                this.windowWidth = window.innerWidth;

    this.nbrBullToBeDisplayed = nbrBullFullScreen; 

    
    if(this.windowWidth>=1200){
      this.nbrBullToBeDisplayed = nbrBullFullScreen;
    }else if(this.windowWidth<1200  && this.windowWidth>=1000){
      this.nbrBullToBeDisplayed = nbrBullScreen12001000;
    }else if(this.windowWidth<1000 && this.windowWidth>=600){
      this.nbrBullToBeDisplayed = nbrBullScreen1000600;
    }else if(this.windowWidth<600){
      this.nbrBullToBeDisplayed = nbrBullScreen600;
    }


    this.isSelectBoxOpen = new Map();
    this.laxModeMenuOpen = new Map();
    this.laxModeActive = new Map();

    this.imgSelectionOpen = new Map();

    //Subscription to filtersSearchService variables
    this.selectedItemSubscription = this.filterSearchService.selectedItemSubject.subscribe(data => {
      this.selectedItem = data;
    } );
    this.filterSearchService.emitSelectedItem();

    this.laxModeActiveSubscription = this.filterSearchService.laxModeActiveSubject.subscribe(data => {
      this.laxModeActive = data;
    });
    this.filterSearchService.emitLaxModeActive();

    this.filtersSubscription = this.filterSearchService.filtersSubject.subscribe(data => {
      this.filters = data;
    } );
    this.filterSearchService.emitFilters();
    

    this.datasASELUPDERGOSubscription = this.retreiveHttpDataService.datasASELUPDERGOSubject.subscribe( data => {
      this.datasASELUPDERGO = data;
          if(this.datasASELUPDERGO.EnableOK!= null){
            if(this.datasASELUPDERGO.EnableOK == '0'){
              this.footerService.desactivationButton('O');
            }else{
              this.footerService.activationButton('O');
            }
          }  
    });
    this.retreiveHttpDataService.emitDatasASELUPDERGO();

    this.formatedDatasASELUPDERGOSubscription = this.retreiveHttpDataService.formatedDatasASELUPDERGOSubject.subscribe( data => {
      this.formatedDatasASELUPDERGO = data;
    });
    this.retreiveHttpDataService.emitFormatedDatasASELUPDERGO();


    this.responseImgSelection = new Map();
    this.responseImgSelectionSubscription = this.retreiveHttpDataService.responseImgSelectionSubject.subscribe(data => {
      this.responseImgSelection = data;
    });
    this.retreiveHttpDataService.emitResponseImgSelection();
 

    this.isSelectBoxOpenSubscription = this.configuratorDisplayService.isSelectBoxOpenSubject.subscribe(data =>{
      this.isSelectBoxOpen = data;
    });
    this.configuratorDisplayService.emitIsSelectBoxOpen();

    this.laxModeMenuOpenSubscription = this.configuratorDisplayService.laxModeMenuOpenSubject.subscribe(data => {
      this.laxModeMenuOpen = data;
    });
    this.configuratorDisplayService.emitLaxModeMenuOpen();

  }


  ngOnDestroy(): void {
    this.filtersSubscription.unsubscribe();
    this.selectedItemSubscription.unsubscribe();
    this.datasASELUPDERGOSubscription.unsubscribe();
    this.formatedDatasASELUPDERGOSubscription.unsubscribe();
    this.responseImgSelectionSubscription.unsubscribe();
    this.laxModeActiveSubscription.unsubscribe();
    this.isSelectBoxOpenSubscription.unsubscribe();
  }

  ngOnInit(): void {
  }

    //Void to perform a filter when selection in selectbox
    async onFilterByItem(data: any, clickDisabled: boolean) {
      if(!clickDisabled){
        this.loadingService.displayLoading();
        //Reinitilize the is isSelectBoxOpen to false
        this.configuratorDisplayService.setIsSelectBoxOpen(data.element.id, false);
        //indicates that the new filter is not applied yet
        this.filterSearchService.filtredToFalse();
        this.configuratorDisplayService.initIsFirstLoadFilter();
        this.configuratorDisplayService.nextFilterEventSubject([ data.element.id, "=", data.itemIndex]);
      } 
    }
   
    //Void to perform a filter when selection by clicking a bull
    async onFilterByItemBull(code: string, index: number, clickDisabled: boolean) {
      if(!clickDisabled){ 
        this.loadingService.displayLoading();
        if(this.filters.get(code)==null){
          //indicates that the new filter is not applied yet
          this.filterSearchService.filtredToFalse();
          this.configuratorDisplayService.initIsFirstLoadFilter();
          this.configuratorDisplayService.nextFilterEventSubject([ code, "=", index]);
        }else{
          await this.onResetFilter(code);
        }
      } 
    }
    
    async onFilterByImage(code: string, index: number) {
  
        this.loadingService.displayLoading();
        if(this.filters.get(code)==null){
          //indicates that the new filter is not applied yet
          this.filterSearchService.filtredToFalse();
          this.configuratorDisplayService.initIsFirstLoadFilter();
          this.configuratorDisplayService.nextFilterEventSubject([ code, "=", index]);
          this.openCloseImgSelection(code);
        }else{
          await this.onResetFilter(code);
          this.openCloseImgSelection(code);
        }
        
    }
  
  
    //Void to reset filter, it calls the filterByItem2 function witch is a copy of filterByitem execept the parameters type and source
    async onResetFilter(code: string){
      //indicates that the new filter is not applied yet
      this.filterSearchService.filtredToFalse();
      this.configuratorDisplayService.initIsFirstLoadFilter();
      this.configuratorDisplayService.nextFilterEventSubject([ code, "=", -1]);
    } 
  
    //Void to perform a search 
    async onSearch(form: NgForm, code: string, pattern: string) {
      this.loadingService.displayLoading();
      //indicates that the new search is not applied yet
      this.filterSearchService.filtredToFalse();
      let searchOrExactValue: string;
      if(pattern.includes('W') || pattern.includes('w')){
        searchOrExactValue = 'search';
      }else{
        searchOrExactValue = 'exactValue';
      }
      this.configuratorDisplayService.initIsFirstLoadFilter();
      this.configuratorDisplayService.nextFilterEventSubject([ code, searchOrExactValue, form.value[code] ]);
    }
  
  
  
    //Function return the width of the selectBox and select box counter
    getBullPWidth(selectBoxData: any, isLaxMode: boolean): number{
      let nbrbull = this.nbrBullToBeDisplayed;
      if((!this.haveBull(selectBoxData.code, this.getCurrentValueBull(selectBoxData.code))) && (this.filters.get(selectBoxData.code)==null)){
        nbrbull++;
      }
      if(nbrbull>1){
        return ((document.getElementsByClassName('for-bull-container')[0].clientWidth - 140) / nbrbull);
      } else{
        return ((document.getElementsByClassName('for-bull-container')[0].clientWidth - 40));
      } 
      
    } 
  
      //Function return the width of the selectBox and select box counter
      InitializeSelectBoxWidthSelectBoxIndex(code: string):boolean{
        //Get the parent width for the select box element
        const widthSelectBox = this.windowWidth<600?(document.getElementsByClassName('select-box-container')[0].clientWidth)-40:(document.getElementsByClassName('select-box-container')[0].clientWidth)-30;
        this.selectBoxWidth = widthSelectBox;
        return true;
      } 
    
      //EventListner to modify the nbrBullToBeDisplayed when window resize
      @HostListener('window:resize', ['$event'])
      onResizeWindow(event: any) {
       this.windowWidth = window.innerWidth;
        if(this.windowWidth>=1200){
          this.nbrBullToBeDisplayed = nbrBullFullScreen;
        }else if(this.windowWidth<1200  && this.windowWidth>=1000){
          this.nbrBullToBeDisplayed = nbrBullScreen12001000;
        }else if(this.windowWidth<1000 && this.windowWidth>=600){
          this.nbrBullToBeDisplayed = nbrBullScreen1000600;
        }else if(this.windowWidth<600){
          this.nbrBullToBeDisplayed = nbrBullScreen600;
        } 
      }
  
      //Function returns if an element will be used or not according to the pattern
      useElement(code: string, pattern: string, elementType: string): boolean{
        let result = false;
        switch(elementType){
          case 'label':{
            if(pattern.includes('L')){
              result= true;
            }
            break;
          }
          case 'input':{
            if(pattern.includes('W') || pattern.includes('w') || pattern.includes('k') || pattern.includes('K') || pattern.includes('v')){
              result= true;
            }
            break; 
          }  
          case 'selectBox':{
            if(pattern.includes('E') || pattern.includes('V') || pattern.includes('Y')){
              result= true;
            }
            break; 
          }
          case 'laxMode':{
            if(pattern.includes('E')){
              result= true;
            }
            break; 
          }  
          case 'img-selection':{
            if(pattern.includes('SA')){
              result= true;
            }
          }
        } 
        return result;
      }
  
      isInputDisabled(pattern: string, code: string): boolean{
        let res = false;
        if(pattern.includes('v')){
          res = true;
        }
        if(this.formatedDatasASELUPDERGO != null) {
          this.formatedDatasASELUPDERGO.forEach((element: any) => {
            if(element.Code == code){
                if(element.Status == 'SELCONST' || element.Status == 'CONSTANT'){
                    res = true;
                }
            }
          });
        }
        return res;
      }
    
      //Function returns element type according to formField.Type, to be used in inputs for exemple
      getElementType(type: string): string{
        let result = 'text';
        switch(type){
          case 'S':{
            result = 'text';
            break;
          } 
          case 'I':{
            result = 'number';
            break;
          } 
        } 
        return result;
      }
  
      selectBoxPlaceHolder(code: string): string{
        const valuePlaceHolder = this.getCurrentValueBull(code);
        if(valuePlaceHolder!=''){
            if(this.firstLetterLaxMode(valuePlaceHolder)){
              return ' ! '+valuePlaceHolder.substring(1, valuePlaceHolder.length);
            }
            else{
              return valuePlaceHolder;
            }
        }
        else{
          return 'select';
        }
      }
  
      selectBoxValue(code: string): string{
        const valuePlaceHolder = this.selectedItem.get(code);
        if(valuePlaceHolder!=null){
            if(this.firstLetterLaxMode(valuePlaceHolder)){
              return ' ! '+valuePlaceHolder.substring(1, valuePlaceHolder.length);
            }
            else{
              return valuePlaceHolder;
            }
        }
        else{
          return 'select';
        }
      }
  
  
      getSlicePossValues(code: string, values: string[], isLaxMode: boolean): string[]{ 
        
          let res: string[] = [] ;  
          //if is it a lax mode attribute
          if(isLaxMode){
              //if there is no white space values
              if(values.indexOf('')==-1){
                
                res= values.slice(0, this.nbrBullToBeDisplayed);
              } 
              // if there is a white space value
              else{
                //if nbr values is inferior than nbr max bulls => white space will be displayed as ?
                if(values.length<=this.nbrBullToBeDisplayed){
                  values[values.indexOf('')]= '?';
                  res= values.slice(0, this.nbrBullToBeDisplayed);
                }
                //if nbr values superior than nbr max bulls => white space will not be displayed
                else{
                  let counterRes = 0;
                  values.forEach(element => {
                    if(element!=''){
                      res[counterRes] = element;
                      counterRes++; 
                    } 
                  });
                  res= res.slice(0, this.nbrBullToBeDisplayed);
                }  
              } 
          } 
          //if itsn't a lax mode attribute
          else{
            res= values.slice(0, this.nbrBullToBeDisplayed);
          } 
          this.bullSlice.set(code, res);
          return res;
        
      }  
  
      //Function returns if the select box will be displayed or not (return boolean)
      //if the number of possible values > number of bulls displayed => display the select box
      
      displaySelectBox(code: string, lengthPossibleValues: number): boolean{
        if(this.windowWidth<600){
          return true
        } else if(this.filters.get(code)==null){
            if((lengthPossibleValues>this.nbrBullToBeDisplayed) && (this.haveBull(code, this.selectedItem.get(code)))){
              return true
            } else if((lengthPossibleValues>this.nbrBullToBeDisplayed+1) && (!this.haveBull(code, this.selectedItem.get(code)))){
              return true
            } else{
              return false
            } 
        } else {
          return false;
        } 
      } 
  
      //Function returns if a value begins with the letter of lax mode
      firstLetterLaxMode(value: any) : boolean{
        
        if(value == undefined){
          return false
        } 
        else if(value.charCodeAt(0)!=8799){
          return false
        } 
        else{
          return true
        } 
      } 
  
  
  
      //Function returns if a selected value in the dataGrid exists as a bull
      haveBull(code:any , value: any): boolean{
        
        let result = false;
        if(code == null || code == '' || value == null || value == '' ){
          return true;
        } 
        const aux = this.bullSlice.get(code) || [];  
        aux.forEach(bull => {
            if(bull==value){
              result = true;
            } 
        });  
        return result;
      } 
  
      //Function to open the select box
      openCloseSelectBox(code: string): void{
        if(this.isSelectBoxOpen.get(code)==null || !this.isSelectBoxOpen.get(code)){
          this.selectBox.get(0).instance.open();
          this.configuratorDisplayService.setIsSelectBoxOpen(code, true)
        }else{
          this.selectBox.get(0).instance.close();
          this.configuratorDisplayService.setIsSelectBoxOpen(code, false)
        } 
      } 
  
  
      //Function to assaign isSelectBoxOpen To False when the select box is closed
      isSelectBoxOpenToFalse(code:string): void{
        this.configuratorDisplayService.setIsSelectBoxOpen(code, false);
      } 
  
      onIconClick(code:string, icon:string): void{
        switch(icon){
          case 'listderoulante' : {
            this.openCloseSelectBox(code);
            break;
          } 
          case 'reset' : {
            this.loadingService.displayLoading();
            this.onResetFilter(code);
            break;
          } 
        } 
      } 
  
      openLaxModeMenu(event: any, code: string): void{
        event.stopPropagation();
        this.configuratorDisplayService.openLaxModeMenu(code);
      } 
  
      laxModeMenu(event:any, code: string): void{
        this.toggleDefaultLaxMode();
        this.closeLaxModeMenu();
        if((this.laxModeActive.get(code)!=null) && (this.laxModeActive.get(code))){
          this.filterSearchService.modifyLaxModeActive(code, false);
        } 
        else{
          this.filterSearchService.modifyLaxModeActive(code, true);
        } 
      } 
  
      closeLaxModeMenu(): void{
        this.configuratorDisplayService.closeLaxModeMenu();
      }
  
  
      //function for tooltip
      toggleDefault(possvalueCode: string) {
        this.defaultVisible.set(possvalueCode, this.defaultVisible.get(possvalueCode)!=null? (!this.defaultVisible.get(possvalueCode)) : true );
      }
  
      getVisible(possvalueCode: string): any{
        if(this.defaultVisible.get(possvalueCode)!=null){
          return this.defaultVisible.get(possvalueCode);
        } 
        else{
          return false;
        } 
      } 
  
      toggleDefaultSelectBox(possvalueCode: string) {
        this.defaultVisibleSelectBox.set(possvalueCode, this.defaultVisibleSelectBox.get(possvalueCode)!=null? (!this.defaultVisibleSelectBox.get(possvalueCode)) : true );
      }
  
      toggleDefaultLaxMode(){
        this.defaultVisibleLaxMode = !this.defaultVisibleLaxMode;
      } 
  
      toggleDefaultLaxModeActive(criteriaCode: string){
        this.defaultVisibleLaxModeActive.set(criteriaCode, this.defaultVisibleLaxModeActive.get(criteriaCode)!=null? (!this.defaultVisibleLaxModeActive.get(criteriaCode)) : true );
      } 
  
      getVisibleSelectBox(possvalueCode: string): any{
        if(this.defaultVisibleSelectBox.get(possvalueCode)!=null){
          return this.defaultVisibleSelectBox.get(possvalueCode);
        } 
        else{
          return false;
        } 
      } 
  
      getVisibleLaxModeActive(criteriaCode: string): any{
        if(this.defaultVisibleLaxModeActive.get(criteriaCode)!=null){
          return this.defaultVisibleLaxModeActive.get(criteriaCode);
        } 
        else{
          return false;
        } 
      } 
  
      generateid(possvalueCode: string): any{
        if(this.randomId.get(possvalueCode)==null){
          this.randomId.set(possvalueCode, '_' + Math.random().toString(36).substr(2, 9));
        } 
        return this.randomId.get(possvalueCode);
      }
  
      generateidSelectBox(possvalueCode: string): any{
        if(this.randomIdSelectBox.get(possvalueCode)==null){
          this.randomIdSelectBox.set(possvalueCode, '_' + Math.random().toString(36).substr(2, 9));
        } 
        return this.randomIdSelectBox.get(possvalueCode);
      }
      //---------- 


  
      isOpenImgSelection(code: string): boolean{
          return (this.imgSelectionOpen.get(code)==null||!this.imgSelectionOpen.get(code))?false:true;
      }
  
      async openCloseImgSelection(code: string): Promise<void>{
        if(this.imgSelectionOpen.get(code)==null||!this.imgSelectionOpen.get(code)){
          this.imgSelectionOpen.set(code, true);
          await this.retreiveHttpDataService.getPicturesForImgSelection(code);
        }else{
          this.imgSelectionOpen.set(code, false);
        }
      }
  
  
  
      getCurrentValueInput(code: string): string{
        let res = '';
  
        if(this.formatedDatasASELUPDERGO != null) {
          this.formatedDatasASELUPDERGO.forEach((element: any) => {
            if(element.Code == code){
                const arrayCurrvalues = this.toArray(element.currvalues)
                if ((arrayCurrvalues.length == 1) && (element.Status=='SELSPEC' || element.Status=='KBDSPEC' || element.Status == 'SELCONST' || element.Status == 'CONSTANT')){
                    res = arrayCurrvalues[0];
                }
            }
          });
        }
  
        return res;
      }
  
      getCurrentValueBull(code: string): string{
        let res = '';
  
        if(this.formatedDatasASELUPDERGO != null) {
          this.formatedDatasASELUPDERGO.forEach((element: any) => {
            if(element.Code == code){
                const arrayCurrvalues = this.toArray(element.currvalues)
                if ((arrayCurrvalues.length == 1) ){
                    res = arrayCurrvalues[0];
                }
            }
          });
        }
  
        return res;
      }
  
  
      toArray(object: any): any{
        if(Array.isArray(object)){
          return object
        }else{
          let array : any[]=[];
          array.push(object);
          return array;
        }
      }

}
