import { FilterSearchService } from './filtersSearch.service';
import { HeaderService } from './header.service';
import { FooterService } from './footer.service';
import { NavigationStepsService } from './navigationSteps.service';
import { RetreiveHttpDataService } from './retreiveHttpData.service';
import { buttonsPath, routingArray, firstPageToload, constHeader } from './../Shared/Constantes';
import { Subject, Subscription } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';
import { ConfiguratorDisplayService } from './configuratorDisplay.service';
@Injectable()

export class RoutingService implements OnDestroy{

    // variable to save the current page, it's accessible throw observable subscription.
    private actualPage: string;

    //Subject to send the current page (actualPage variable) throw subscription
    actualPageSubject = new Subject<string>();

    firstPageToload = firstPageToload;


    responseOptions: any;
    responseOptionsSubscription : Subscription;

    //The first actualPage to be shown is the Menu (menu component)
    constructor(private retreiveHttpDataService: RetreiveHttpDataService, 
                private navigationStepsService: NavigationStepsService,
                private footerService: FooterService,
                private headerService:  HeaderService,
                private router: Router, 
                private filterSearchService: FilterSearchService,
                private loadingService: LoadingService,
                private configuratorDisplayService: ConfiguratorDisplayService){
        
        
        this.actualPage = this.firstPageToload;
        

        this.responseOptionsSubscription = this.retreiveHttpDataService.responseOptionsSubject.subscribe(data => {
            this.responseOptions = data;
          });
          this.retreiveHttpDataService.emitResponseOptions();
    }
    ngOnDestroy(): void {
        this.responseOptionsSubscription.unsubscribe();
    }

    //Void to update (mettre à jour) the value of current page (actualPage variable) to subscriptions
    emitActualPage(): void{
        this.actualPageSubject.next(this.actualPage);
    } 

    //Void to set the current page (actualPage variable)
    setActualPage(nextPage: string): void{
        //if the path given in the parameter is authorised, then modifie the currentPage 
        if(routingArray.includes(nextPage)){
            switch(nextPage){
                case 'Catalogue' : {
                    this.footerService.displayOnly(buttonsPath.get('Catalogue'));
                    this.footerService.desactivationButton('C');
                    break;
                }
                case 'Menu': {
                    this.headerService.modifyMainImg(constHeader.mainImg);
                    this.headerService.modifyTitle(constHeader.mainTitle);
                    this.filterSearchService.initializeLaxModeActive();
                    this.filterSearchService.initializeFilters();
                    break;
                }  
                case 'Icon': {
                    this.headerService.modifyMainImg(constHeader.mainImg);
                    this.headerService.modifyTitle(constHeader.mainTitle);
                    this.footerService.displayOnly(buttonsPath.get('Icon'));
                    this.filterSearchService.initializeLaxModeActive();
                    this.filterSearchService.initializeFilters();
                    break;
                } 
                case 'Configurator': {

                    this.footerService.displayOnly(buttonsPath.get('Configurator'));
                    
                    //initialize datagrid : make a change in nextFilterEventSubject to reload the datagrid
                    let filterArray = [];
                    this.configuratorDisplayService.change = !this.configuratorDisplayService.change;
                    filterArray.push(this.configuratorDisplayService.change);
                    this.configuratorDisplayService.nextFilterEventSubject(filterArray);

                    //initialize subform display
                    if(this.navigationStepsService.getLastStep().path!='Configurator'){
                        this.configuratorDisplayService.initDisplaySubform();
                        this.configuratorDisplayService.displayFirstSubform();
                        this.configuratorDisplayService.initDisplayExtentionSubform();
                    }
                    //initialize selectedItem
                    this.filterSearchService.initSelectedItem();
                    //initialise isFirstLoad and isFirstLoadFilter
                    this.configuratorDisplayService.initIsFirstLoad();
                    this.configuratorDisplayService.initIsFirstLoadFilter();

                    //initialize variables for the selectBox
                    this.configuratorDisplayService.initIsSelectBoxOpen();

                    break;
                } 
                case 'Recap': {
                    if(Number(this.responseOptions.infos.Parts)>0){
                        this.footerService.displayOnly(buttonsPath.get('Recap')?.concat(['S']));
                    }else{
                        this.footerService.displayOnly(buttonsPath.get('Recap'));
                    }
                    this.filterSearchService.initializeLaxModeActive();
                    break;
                } 
            } 
            this.actualPage = nextPage;
            this.emitActualPage();
        }
        //if the path given in the parameter is not authorised, actualPage will be the Menu (menu component)
        else {
            console.error('Error getting next page. There is no corresponding page to '+ nextPage + '. Redirecting to main menu.')
            this.actualPage = 'Menu';
            this.emitActualPage();
        } 
    }

    //Void to process click, it takes the name of the clicked item and perform those steps :
    //Call asynchronous function (with await) getHttpResponse to build data in the retreiveHttpDataService. The getHttpResponse function returns a new navigation step
    //According to the command in the navigation step, we can decide the next action
    //wether call SetActualPAge to redirect the app to new page, add the new path to the new step and finally push the new step in the navigation steps array 
    //Or call another time the processClick method (recursive call) with 'CalledByProcessClick' as a parameter (In this case, the new step will be pushed in the navigation steps array later )
    async processClick(clicked: string, parameter: any): Promise<void> {
        

        let command = '';

        if(clicked==='Back'){
            command = await this.retreiveHttpDataService.getHttpResponse(clicked, this.actualPage);
            if (!(command == null || command == '')){
                //Call the buildDataAccordingToCommand method
                this.retreiveHttpDataService.buildDataAccordingToCommand(command);
            }
        }
        else if(clicked==='ChangeLanguage'){
            const newParameter = {'parameter': parameter, 'actualPage': this.actualPage};
            command = await this.retreiveHttpDataService.getHttpResponse(clicked, newParameter);
            if (!(command == null || command == '')){
                //Call the buildDataAccordingToCommand method
                this.retreiveHttpDataService.buildDataAccordingToCommand(command);
            }
        }
        else{
            command = await this.retreiveHttpDataService.getHttpResponse(clicked, parameter);
            if (!(command == null || command == '')){
                //Call the buildDataAccordingToCommand method
                this.retreiveHttpDataService.buildDataAccordingToCommand(command);
            }
        }     
            
            switch(command){
                case 'A_ERROR':{
                    this.loadingService.unDisplayLoading();
                    break;
                } 
                case 'A_DESTROY':{
                    this.setActualPage(firstPageToload);
                    this.navigationStepsService.putPathOnNewStep(firstPageToload);
                    this.navigationStepsService.pushNewStepInNavigationSteps();
                    this.loadingService.unDisplayLoading();
                    break;
                } 
                case 'A_GODBPANEL': {
                    this.setActualPage('Catalogue');
                    this.navigationStepsService.putPathOnNewStep('Catalogue');
                    this.navigationStepsService.pushNewStepInNavigationSteps();
                    this.loadingService.unDisplayLoading();
                    break;
                }
                case 'A_GOFAMPANEL':{
                    this.setActualPage('Icon');
                    this.navigationStepsService.putPathOnNewStep('Icon');
                    this.navigationStepsService.pushNewStepInNavigationSteps();
                    this.loadingService.unDisplayLoading();
                    break;
                }
                case 'A_GOSELPANEL':{
                    this.processClick('A_GOSELPANEL_DONE', parameter);
                    break;
                }
                case 'A_SELUPDERGO':{
                    this.processClick('A_SELUPDERGO_DONE', parameter);
                    break;
                } 
                case 'A_SPEC':{
                    this.processClick('A_SPEC_DONE', parameter);
                    break;
                } 
                case 'A_GOCONSPANEL':{
                    this.processClick('A_GOCONSPANEL_DONE', parameter);
                    break;
                } 
                case 'A_CONSUPDERGO':{
                    this.setActualPage('Recap');
                    this.navigationStepsService.putPathOnNewStep('Recap');
                    this.navigationStepsService.pushNewStepInNavigationSteps();
                    this.loadingService.unDisplayLoading();
                    break;
                } 
                case  'A_SELLISTUPDERGO':{
                    this.processClick('A_SELLISTUPDERGO_DONE', parameter);
                    break;
                } 
                case 'LISTINGDATA':{
                    this.setActualPage('Configurator');
                    this.navigationStepsService.putPathOnNewStep('Configurator');
                    this.navigationStepsService.pushNewStepInNavigationSteps();
                    this.loadingService.unDisplayLoading();
                    break;
                }
                case 'A_PARTPANEL':{
                    this.navigationStepsService.putPathOnNewStep('DisplayParts');
                    this.navigationStepsService.pushNewStepInNavigationSteps();
                    this.loadingService.unDisplayLoading();
                    break;
                }
            }

    } 

} 