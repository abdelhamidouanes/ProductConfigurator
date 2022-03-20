import { Component, HostListener, OnDestroy } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import DataSource from "devextreme/data/data_source";
import { Subscription } from "rxjs";
import { ConfiguratorDisplayService } from "../Services/configuratorDisplay.service";
import { LoadingService } from "../Services/loading.service";
import { RetreiveHttpDataService } from "../Services/retreiveHttpData.service";
import { specCatalogs } from "../Shared/Constantes";

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.css']
})
export class ConfiguratorComponent implements OnDestroy {


  specCatalogs = specCatalogs;

  specURL: any;
  specURLSubscription : Subscription;

  //Variable to store the sub forms (family of multi-search-criteria) data, 
  //each element contain a formFields array (describes the criteria of search for each family)
  subForms: any[]; 


  //Variables to get criteria data
  contentAGOSELPANEL: any;
  contentAGOSELPANELSubscription: Subscription;


  subformDisplay: Map<string, boolean>;
  subformDisplaySubscription: Subscription;
  


  extentionSubformDisplay: Map<string, boolean>;
  extentionSubformDisplaySubscription: Subscription;
  
  //Variable to store possible values for each criteria
  selectBoxDatas: {code: string, data: DataSource}[] =[];
  selectBoxDatasSubscription: Subscription;


  //Variable to retreive columns information
  columnsA_SELLISTUPDERGO: any;
  columnsA_SELLISTUPDERGOSubscription: Subscription;


  //window width used for the absolute position of the select box
  windowWidth : number; 


  formfiedOptions: any[] = [];

  ngOnDestroy(): void {
    this.specURLSubscription.unsubscribe();
    this.contentAGOSELPANELSubscription.unsubscribe();
    this.subformDisplaySubscription.unsubscribe();
    this.extentionSubformDisplaySubscription.unsubscribe();
    this.selectBoxDatasSubscription.unsubscribe();
    this.columnsA_SELLISTUPDERGOSubscription.unsubscribe();
  }

  constructor(private loadingService: LoadingService,
              public retreiveHttpDataService: RetreiveHttpDataService,
              public sanitizer: DomSanitizer,
              public configuratorDisplayService: ConfiguratorDisplayService) {           
  
                this.windowWidth = window.innerWidth;

                this.specURLSubscription = new Subscription();
                if(specCatalogs.includes(this.retreiveHttpDataService.responseOptions.CatCode.toUpperCase())){
                  this.specURLSubscription = this.retreiveHttpDataService.specASPECSubject.subscribe(data => {
                    this.specURL = this.sanitizer.bypassSecurityTrustResourceUrl(data.URL);
                  });
                  this.retreiveHttpDataService.emitSpecASPEC();
                } 



                //Initialising variables
                this.subForms=[]; 
                this.contentAGOSELPANELSubscription = new Subscription; 


                //subscription to the contentAGOSELPANEL subject then emit data 
                //If subforms isn't an array we make it an array with only one element
                this.contentAGOSELPANELSubscription = this.retreiveHttpDataService.contentAGOSELPANELSubject.subscribe(
                  (data) => {
                    if(Array.isArray(data.subforms)){
                      this.contentAGOSELPANEL = data;
                      this.subForms = this.contentAGOSELPANEL.subforms;
                    } 
                    else{
                      data.subforms = [data.subforms];
                      this.contentAGOSELPANEL = data;
                      this.subForms = this.contentAGOSELPANEL.subforms;
                    } 
                  }
                );
                this.retreiveHttpDataService.emitContentAGOSELPANEL();
              


                //Initializing subformDisplay with true for the first element, and false for others
                this.subformDisplay = new Map();
                this.subformDisplaySubscription = new Subscription();

                this.extentionSubformDisplay = new Map();
                this.extentionSubformDisplaySubscription = new Subscription();

                this.subformDisplaySubscription = this.configuratorDisplayService.subformDisplaySubject.subscribe(data => {
                  this.subformDisplay = data;
                });
                this.configuratorDisplayService.emitSubformDisplay();


                this.extentionSubformDisplaySubscription = this.configuratorDisplayService.extentionSubformDisplaySubject.subscribe(data => {
                  this.extentionSubformDisplay = data;
                });
                this.configuratorDisplayService.emitExtentionSubformDisplay();


                //subscription to the selectBoxDatasSubject then emit data
                this.selectBoxDatasSubscription = this.retreiveHttpDataService.selectBoxDatasSubject.subscribe(
                  (data) => this.selectBoxDatas = data
                );
                this.retreiveHttpDataService.emitSelectBoxDatas();

                //Subscribe to columnsA_SELLISTUPDERGOSubject to get columns name
                this.columnsA_SELLISTUPDERGOSubscription = this.retreiveHttpDataService.columnsA_SELLISTUPDERGOSubject.subscribe(data =>{
                  this.columnsA_SELLISTUPDERGO = data;
                });
                this.retreiveHttpDataService.emitColumnsA_SELLISTUPDERGO();

                this.createSubformForOptionalFormfields();
  }

  ngAfterViewInit(): void{
    this.loadingService.unDisplayLoading();
  }
  
 
  closeLaxModeMenu(): void{
    this.configuratorDisplayService.closeLaxModeMenu();
  }


  displayUndisplaySubform(index: number): void{
    this.configuratorDisplayService.displayUndisplaySubform(index);
  }

  displaySubform(index: number): any{
    return this.subformDisplay.get(this.configuratorDisplayService.getIdSubform(index))==null?false:this.subformDisplay.get(this.configuratorDisplayService.getIdSubform(index));
  }


  displayUndisplayExtentionSubform(index: number): void{
    this.configuratorDisplayService.displayUndisplayExtentionSubform(index);
  }

  displayExtentionSubform(index: number): any{
    return this.extentionSubformDisplay.get(this.configuratorDisplayService.getIdSubform(index))==null?false:this.extentionSubformDisplay.get(this.configuratorDisplayService.getIdSubform(index));
  }


  @HostListener('window:resize', ['$event'])
  onResizeWindow(event: any) {
   this.windowWidth = window.innerWidth;
  }


  createSubformForOptionalFormfields(){
    
    this.subForms.forEach((subform, index) => {
      let formFieldsOptionalPerSubform: any[] = [];
      let formFieldsRegularPerSubform: any[] = [];

      subform.formfields.forEach((formfield: any) => {
        if((+formfield.Options &  0x1) != 0){
          formFieldsOptionalPerSubform.push(formfield);
        }else {
          formFieldsRegularPerSubform.push(formfield);
        }
      });
      
      if(formFieldsRegularPerSubform.length > 0){
        this.formfiedOptions[index] = formFieldsOptionalPerSubform;
        this.subForms[index].formfields = formFieldsRegularPerSubform;
      }else{
        this.subForms[index].formfields = formFieldsOptionalPerSubform;
        this.formfiedOptions[index] = [];
      }
      
    });

  }

}
