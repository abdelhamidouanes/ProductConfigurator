import { FooterService } from './footer.service';
import { PopUpService } from './popUp.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HeaderService } from './header.service';
import { RoutingService } from './routingService.service';
import { DatasASELUPDERGO } from './../Models/DatasASELUPDERGO.model';
import { ContentAGOSELPANEL } from './../Models/ContentAGOSELPANEL.model';
import { ResponseOptionsInfos } from './../../TechnicalModels/ResponseOptionsInfos.model';
import { ResponseOptions } from './../../TechnicalModels/ResponseOptions.model';
import { ResponseInfos } from './../../TechnicalModels/ResponseInfos.model';
import { NavigationStep } from './../../TechnicalModels/NavigationStep.model';
import { catalogName, catologNeedUserNameAndPassWord, catalogUserName, catalogPassWord, navigationSteps, thresholdSelectBox, pageSizeSelectBox, speccode, specCatalogs } from './../Shared/Constantes';
import { Icon } from '../Models/Icon.model';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs'; 
import { Injectable, OnDestroy, Sanitizer, SecurityContext } from '@angular/core';
import { NavigationStepsService } from './navigationSteps.service';
import { ResponseOptionsProgression } from 'src/TechnicalModels/ResponseOptionsProgression.model';
import { Image } from '../Models/Image.model';
import { CriteriaASELUPDERGO } from '../Models/CriteriaASELUPDERGO.model';
import { ParameterASELUPDERGO } from '../Models/ParameterASELUPDERGO.model';
import DataSource from 'devextreme/data/data_source';
import { FilterSearchService } from './filtersSearch.service';
import { environment } from 'src/environments/environment';
@Injectable()

export class RetreiveHttpDataService implements OnDestroy{

    //Variable to save retreived data in its raw state
    private data: any;

    //variable to save the catalog name
    catalogueSelectedInCatalogueList : string = '';

    apiLink = environment.apiLink;

    //Variable to store the parameters of each search criteria
    //each element contain a string array with all the possible values
    parameters: ParameterASELUPDERGO[]; 
    
    //Variable to store possible values for each criteria
    selectBoxDatas: {code: string, data: DataSource}[] =[];
    //Subject to send possible values data throw subscription
    selectBoxDatasSubject = new Subject<{code: string, data: DataSource}[]>();



    //Private variable to save categorie icons, it's accessible throw observable subscription
    private icons: Icon[]; 
    //Subject to send categories icons data throw subscription
    iconsSubject = new Subject<Icon[]>();


    //Private variable to save ccatalogue list, it's accessible throw observable subscription
    private catalogues: any[]; 
    //Subject to send catalogue list data throw subscription
    catalogueSubject = new Subject<any[]>();


    //Private variable to save content part of the response AGOSELPANEL it's accessible throw observable subscription
    contentAGOSELPANEL: ContentAGOSELPANEL; 
    //Subject to send content part of the response AGOSELPANEL throw subscription
    contentAGOSELPANELSubject = new Subject<ContentAGOSELPANEL>();


    //Private variable to save datas part of the response A_SELUPDERGO it's accessible throw observable subscription
    private datasASELUPDERGO: any; 
    //Subject to send datas part of the response A_SELUPDERGO throw subscription
    datasASELUPDERGOSubject = new Subject<any>();


    private formatedDatasASELUPDERGO : any;
    formatedDatasASELUPDERGOSubject = new Subject<any>();

    //Private variable to save datas part of the response A_SELUPDERGO it's accessible throw observable subscription
    private specASPEC: any; 
    //Subject to send datas part of the response A_SELUPDERGO throw subscription
    specASPECSubject = new Subject<any>();

    //Private variable to save columns part of the response A_SELLISTUPDERGO it's accessible throw observable subscription
    columnsA_SELLISTUPDERGO: any;
    //Subject to send columns part of the response A_SELLISTUPDERGO throw subscription 
    columnsA_SELLISTUPDERGOSubject = new Subject<any>();

    //Private variable to save columns part of the response A_GOCONSPANEL it's accessible throw observable subscription
    private contentA_GOCONSPANEL: any;
    //Subject to send columns part of the response A_GOCONSPANEL throw subscription 
    contentA_GOCONSPANELSubject = new Subject<any>();
    
    //Private variable to save columns part of the response A_CONSUPDERGO it's accessible throw observable subscription
    private criteriaA_CONSUPDERGO: any;
    //Subject to send columns part of the response A_CONSUPDERGO throw subscription 
    criteriaA_CONSUPDERGOSubject = new Subject<any>();

    private partsA_PARTPANEL: any[]=[];
    partsA_PARTPANELSubject = new Subject<any>();

    private responseQPING: any = {'ERRCODE' : '', 'ERRMSG' : ''} ;
    responseQPINGSubject = new Subject<any>();

    //Variable to use in httpClient requests as the httpBody
    httpBody: FormData;

    //Variable to get navigationSteps array
    navigationSteps : NavigationStep[];
    navigationStepsSubscription : Subscription = new Subscription(); 

    //Variable to store Infos and Options retreived from http response
    responseInfos: any;
    responseInfosSubject = new Subject<any>();
    responseOptions: any;
    responseOptionsSubject = new Subject<any>();
    responseContent : any;
    responseContentSubject = new Subject<any>();
    responseMemos : any;
    responseMemosSubject = new Subject<any>();
    responseImages : any;
    responseImagesSubject = new Subject<any>();
    responseObjects : any;
    responseObjectsSubject = new Subject<any>();
    responseSpecs : any;
    responseSpecsSubject = new Subject<any>();
    responseHelps : any;
    responseHelpsSubject = new Subject<any>();
    responseLangs : any;
    responseLangsSubject = new Subject<any>();

    responseDefaultIntro : any;
    responseDefaultIntroSubject = new Subject<any>();


    responseForTopBarRequest : any;
    responseForTopBarRequestSubject = new Subject<any>();

    topBar : any[];
    topBarSubject = new Subject<any[]>();

    //Variable to store parameter sent when a click is processed
    parameter: Map<string, any> = new Map();


    laxModeActive: Map<string, boolean>;
    laxModeActiveSubscription: Subscription;
    
    private responseImgSelection: Map<string, any>;
    responseImgSelectionSubject = new Subject<Map<string, any>>();

    constructor(private httpClient: HttpClient, private navigationStepsService: NavigationStepsService,
                private filterSearchService: FilterSearchService,
                private headerService: HeaderService,
                private domSanitizer: DomSanitizer,
                private popUpService: PopUpService){
        //Initialising variables
        this.laxModeActive = new Map();
        this.httpBody = new FormData();
        this.icons = []; 
        this.catalogues = [];
        this.responseInfos = new ResponseInfos('', '', '', '');
        this.responseOptions = new ResponseOptions('', '', '', '', '', '', '', new ResponseOptionsProgression('', ''), new ResponseOptionsInfos('', '', '', '', '', '', ''))
        this.contentAGOSELPANEL = new ContentAGOSELPANEL('', '','', '', '', '', '', '', '' , new Image('', '', '', '', '', '', '', '', ''), []);
        this.parameters=[];
        this.navigationSteps =[];  
        this.responseImgSelection = new Map();
        this.topBar = [{
            id: "1",
            name: "Memos",
            items: []
        }, {
            id: "2",
            name: "Illustrations",
            items: []
        }, {
            id: "3",
            name: "Objets",
            items: []
        }, {
            id: "4",
            name: "Spécification",
            items: []
        }, {
            id: "5",
            name: "Aide",
            items: []
        }];
      
        //Inisializing and subscription to navigationSteps
        
        this.navigationStepsSubscription = this.navigationStepsService.navigationStepsSubject.subscribe(data => {
            this.navigationSteps = data;
        } );
        this.navigationStepsService.emitNavigationSteps();

        this.laxModeActiveSubscription = this.filterSearchService.laxModeActiveSubject.subscribe(data =>{
            this.laxModeActive = data;
        });
        this.filterSearchService.emitLaxModeActive();


    } 
    
    ngOnDestroy(): void {
        this.navigationStepsSubscription.unsubscribe();
        this.laxModeActiveSubscription.unsubscribe();
    }

    emitResponseQPING(): void{
        this.responseQPINGSubject.next(this.responseQPING);
    } 

    //Void to update (mettre à jour) categories icons data to subscriptions
    emitIcons(): void{
        this.iconsSubject.next(this.icons.slice());
    } 

   //Void to update (mettre à jour) catalogue list data to subscriptions
   emitCatalogues(): void{
    this.catalogueSubject.next(this.catalogues.slice());
   }

    //Void to update (mettre à jour) content part of the response AGOSELPANEL data to subscriptions
    emitContentAGOSELPANEL(): void{
        this.contentAGOSELPANELSubject.next(this.contentAGOSELPANEL);
    } 

    //Void to update (mettre à jour) datas part of the response A_SELUPDERGO to subscriptions
    emitDatasASELUPDERGO(): void{
        this.datasASELUPDERGOSubject.next(this.datasASELUPDERGO);
    }

    emitFormatedDatasASELUPDERGO(): void{
        this.formatedDatasASELUPDERGOSubject.next(this.formatedDatasASELUPDERGO);
    }

    emitSpecASPEC(): void{
        this.specASPECSubject.next(this.specASPEC);
    } 

    emitColumnsA_SELLISTUPDERGO(): void{
        this.columnsA_SELLISTUPDERGOSubject.next(this.columnsA_SELLISTUPDERGO);
    } 


    emitContentA_GOCONSPANEL(): void{
        this.contentA_GOCONSPANELSubject.next(this.contentA_GOCONSPANEL);
    } 

    emitCriteriaA_CONSUPDERGO(): void{
        this.criteriaA_CONSUPDERGOSubject.next(this.criteriaA_CONSUPDERGO);
    } 

    emitSelectBoxDatas(): void{
        this.selectBoxDatasSubject.next(this.selectBoxDatas.slice());
    } 
    
    emitResponseInfos(): void{
        this.responseInfosSubject.next(this.responseInfos);
    }

    emitResponseOptions(): void{
        this.responseOptionsSubject.next(this.responseOptions);
    }
     
    emitResponseContent(): void{
        this.responseContentSubject.next(this.responseContent);
    }

    emitResponseMemos() : void{
        this.responseMemosSubject.next(this.responseMemos);
    }

    emitResponseImages() : void{
        this.responseImagesSubject.next(this.responseImages);
    }
    
    emitResponseObjects() : void{
        this.responseObjectsSubject.next(this.responseObjects);
    }
   
    
    emitResponseSpecs() : void{
        this.responseSpecsSubject.next(this.responseSpecs);
    }
    
    emitResponseHelps() : void{
        this.responseHelpsSubject.next(this.responseHelps);
    }
    
    emitResponseLangs() : void{
        this.responseLangsSubject.next(this.responseLangs);
    }

    emitResponseDefaultIntro(): void{
        this.responseDefaultIntroSubject.next(this.responseDefaultIntro);
    }

    emitTopBar(): void{
        this.topBarSubject.next(this.topBar.slice());
    }

    emitResponseForTopBarRequest(): void{
        this.responseForTopBarRequestSubject.next(this.responseForTopBarRequest);
    }


    emitPartsA_PARTPANEL(): void{
        this.partsA_PARTPANELSubject.next(this.partsA_PARTPANEL);
    }

    emitResponseImgSelection(): void{
        this.responseImgSelectionSubject.next(this.responseImgSelection);
    }

    //Void to create the httpbody (formData variable) with needed information, according to the parameter httpRequestName (returned by nextHttpRequest function)
    createHttpBody(httpRequestName: string): void{
        switch(httpRequestName){
            case 'Login' :{
                const connexionParams = this.parameter.get('Login');
                this.httpBody = new FormData();
                this.httpBody.append('username', connexionParams.username);
                this.httpBody.append('password', connexionParams.password);
                this.httpBody.append('startingcata', connexionParams.startingcata);
                this.httpBody.append('startingident', connexionParams.startingident);
                this.httpBody.append('ACE_GUI', 'Custom');
                break; 
            }
            case 'ByReference' :{
                this.httpBody = new FormData();
                this.httpBody.append('startingcata', catalogName);
                this.httpBody.append('ACE_GUI', 'Custom');
                this.httpBody.append('Action', 'Q_INIT');
                if(catologNeedUserNameAndPassWord){
                    this.httpBody.append('username', catalogUserName);
                    this.httpBody.append('password', catalogPassWord);
                }
                break; 
            }
            case 'OneIconClicked': {
                this.httpBody = new FormData();
                this.httpBody.append('lang', this.responseOptions.Lang);
                this.httpBody.append('catalog', this.responseOptions.CatCode);
                this.httpBody.append('family', this.responseOptions.FamCode);
                this.httpBody.append('SelPos', this.responseOptions.HistoryCount);
                this.httpBody.append('session', this.responseInfos.session);
                this.httpBody.append('Action', 'Q_SELECTFAM');
                this.httpBody.append('cdstage', this.responseInfos.cdstage);
                this.httpBody.append('svg', 'true');
                this.httpBody.append('do_action', '0');
                this.httpBody.append('famsel', this.parameter.get('OneIconClicked'));
                if(catologNeedUserNameAndPassWord){    
                    this.httpBody.append('username', catalogUserName);
                    this.httpBody.append('password', catalogPassWord);
                }
                break;
            } 
            case 'A_GOSELPANEL_DONE':{
                this.httpBody = new FormData();
                this.httpBody.append('lang', this.responseOptions.Lang);
                this.httpBody.append('catalog', this.responseOptions.CatCode);
                this.httpBody.append('family', this.responseOptions.FamCode);
                this.httpBody.append('SelPos', this.responseOptions.HistoryCount);
                this.httpBody.append('session', this.responseInfos.session);
                this.httpBody.append('Action', 'Q_SELUPDERGO');
                this.httpBody.append('cdstage', this.responseInfos.cdstage);
                this.httpBody.append('svg', 'true');
                this.httpBody.append('do_action', '0');
                this.httpBody.append('SelParameter', '');
                this.httpBody.append('SelState', '0');
                this.httpBody.append('SelValue', '');
                this.httpBody.append('criterid', '0');
                if(catologNeedUserNameAndPassWord){    
                    this.httpBody.append('username', catalogUserName);
                    this.httpBody.append('password', catalogPassWord);
                }
                break;
            } 
            case 'A_SELUPDERGO_DONE' : {
                if(specCatalogs.includes(this.responseOptions.CatCode.toUpperCase())){
                    this.httpBody = new FormData();
                    this.httpBody.append('session', this.responseInfos.session);
                    this.httpBody.append('catalog', this.responseOptions.CatCode);
                    this.httpBody.append('family', this.responseOptions.FamCode);
                    this.httpBody.append('speccode', speccode);
                    this.httpBody.append('Action', 'Q_SPEC');
                    if(catologNeedUserNameAndPassWord){    
                        this.httpBody.append('username', catalogUserName);
                        this.httpBody.append('password', catalogPassWord);
                    }
                }
                else{
                    this.httpBody = new FormData();
                    this.httpBody.append('session', this.responseInfos.session);
                    this.httpBody.append('catalog', this.responseOptions.CatCode);
                    this.httpBody.append('family', this.responseOptions.FamCode);
                    this.httpBody.append('criterid', '1');
                    this.httpBody.append('Action', 'Q_SELLISTUPDERGO');
                    if(catologNeedUserNameAndPassWord){    
                        this.httpBody.append('username', catalogUserName);
                        this.httpBody.append('password', catalogPassWord);
                    }
                }
                break;
            } 
            case 'A_SPEC_DONE' : {
                this.httpBody = new FormData();
                this.httpBody.append('session', this.responseInfos.session);
                this.httpBody.append('catalog', this.responseOptions.CatCode);
                this.httpBody.append('family', this.responseOptions.FamCode);
                this.httpBody.append('criterid', '1');
                this.httpBody.append('Action', 'Q_SELLISTUPDERGO');
                if(catologNeedUserNameAndPassWord){    
                    this.httpBody.append('username', catalogUserName);
                    this.httpBody.append('password', catalogPassWord);
                }
                break;
            } 
            case 'A_SELLISTUPDERGO_DONE' : {
                this.httpBody = new FormData();
                this.httpBody.append('offset', '0');
                this.httpBody.append('limit', '10');
                this.httpBody.append('session', this.responseInfos.session);
                this.httpBody.append('ACE_GUI', 'Custom');
                this.httpBody.append('startingcata', this.responseOptions.CatCode);
                this.httpBody.append('family', this.responseOptions.FamCode);
                this.httpBody.append('criterid', '1');
                this.httpBody.append('options', '2');
                this.httpBody.append('Action', 'Q_SELLISTUPDERGO');
                if(catologNeedUserNameAndPassWord){
                    this.httpBody.append('username', catalogUserName);
                    this.httpBody.append('password', catalogPassWord);
                }
                break; 
            } 
            case 'Filter' : {
                this.httpBody = new FormData();
                this.httpBody.append('lang', this.responseOptions.Lang);
                this.httpBody.append('catalog', this.responseOptions.CatCode);
                this.httpBody.append('family', this.responseOptions.FamCode);
                //Filter or search parameters and value
                if(this.parameter.get('Filter')[1]==='='){
                    if(this.laxModeActive.get(this.parameter.get('Filter')[0])){
                        this.httpBody.append('SelParameter', 'Von_'+this.parameter.get('Filter')[0]);
                    } else{
                        this.httpBody.append('SelParameter', 'VAL_'+this.parameter.get('Filter')[0]);
                    } 
                    this.httpBody.append('SelPos', this.parameter.get('Filter')[2]);
                    this.httpBody.append('SelValue', '');
                } else if(this.parameter.get('Filter')[1]==='search'){
                    this.httpBody.append('SelParameter', 'SRC_'+this.parameter.get('Filter')[0]);
                    this.httpBody.append('SelValue', this.parameter.get('Filter')[2]);
                    this.httpBody.append('SelPos', '-1');
                } else if(this.parameter.get('Filter')[1]==='exactValue'){
                    this.httpBody.append('SelParameter', 'VAL_'+this.parameter.get('Filter')[0]);
                    this.httpBody.append('SelValue', this.parameter.get('Filter')[2]);
                    this.httpBody.append('SelPos', '-1');
                } 
                //-----------
                this.httpBody.append('session', this.responseInfos.session);
                this.httpBody.append('Action', 'Q_SELECT');
                this.httpBody.append('cdstage', this.responseInfos.cdstage);
                
                this.httpBody.append('svg', 'true');
                this.httpBody.append('do_action', '0');
                this.httpBody.append('SelState', '0');
                this.httpBody.append('criterid', '0');
                if(catologNeedUserNameAndPassWord){    
                    this.httpBody.append('username', catalogUserName);
                    this.httpBody.append('password', catalogPassWord);
                }
                break;
            }
            case 'Ok':{
                this.httpBody = new FormData();
                this.httpBody.append('lang', this.responseOptions.Lang);
                this.httpBody.append('catalog', this.responseOptions.CatCode);
                this.httpBody.append('family', this.responseOptions.FamCode);
                this.httpBody.append('SelPos', this.responseOptions.HistoryCount);
                this.httpBody.append('session', this.responseInfos.session);
                this.httpBody.append('Action', 'Q_SELSELECT');
                this.httpBody.append('cdstage', this.responseInfos.cdstage);
                this.httpBody.append('svg', 'true');
                this.httpBody.append('do_action', '0');
                this.httpBody.append('SelParameter', '');
                this.httpBody.append('SelState', '0');
                this.httpBody.append('SelValue', '');
                this.httpBody.append('criterid', '0');
                if(catologNeedUserNameAndPassWord){    
                    this.httpBody.append('username', catalogUserName);
                    this.httpBody.append('password', catalogPassWord);
                }
                break;
            } 
            case 'A_GOCONSPANEL_DONE':{
                this.httpBody = new FormData();
                this.httpBody.append('lang', this.responseOptions.Lang);
                this.httpBody.append('catalog', this.responseOptions.CatCode);
                this.httpBody.append('family', this.responseOptions.FamCode);
                this.httpBody.append('SelPos', this.responseOptions.HistoryCount);
                this.httpBody.append('session', this.responseInfos.session);
                this.httpBody.append('Action', 'Q_CONSUPDERGO');
                this.httpBody.append('cdstage', this.responseInfos.cdstage);
                this.httpBody.append('svg', 'true');
                this.httpBody.append('do_action', '0');
                this.httpBody.append('SelParameter', '');
                this.httpBody.append('SelState', '0');
                this.httpBody.append('SelValue', '');
                if(catologNeedUserNameAndPassWord){    
                    this.httpBody.append('username', catalogUserName);
                    this.httpBody.append('password', catalogPassWord);
                }
                break;
            } 

            case 'Back':{
                if(this.parameter.get('Back') === 'Configurator' ){
                    this.httpBody = new FormData();
                    this.httpBody.append('lang', this.responseOptions.Lang);
                    this.httpBody.append('catalog', this.responseOptions.CatCode);
                    this.httpBody.append('family', this.responseOptions.FamCode);
                    this.httpBody.append('SelPos',  ((+this.responseOptions.HistoryCount -1)+'') );
                    this.httpBody.append('session', this.responseInfos.session);
                    this.httpBody.append('Action', 'Q_GOTO');
                    this.httpBody.append('cdstage', this.responseInfos.cdstage);
                    this.httpBody.append('svg', 'true');
                    this.httpBody.append('do_action', '0');
                    this.httpBody.append('SelParameter', '');
                    this.httpBody.append('SelState', '0');
                    this.httpBody.append('SelValue', '');
                    this.httpBody.append('criterid', '0');
                    if(catologNeedUserNameAndPassWord){    
                        this.httpBody.append('username', catalogUserName);
                        this.httpBody.append('password', catalogPassWord);
                    }
                }else if (this.parameter.get('Back') === 'Icon'){
                    this.httpBody = new FormData();
                    this.httpBody.append('lang', this.responseOptions.Lang);
                    this.httpBody.append('catalog', this.responseOptions.CatCode);
                    this.httpBody.append('family', this.responseOptions.FamCode);
                    this.httpBody.append('famsel', '');
                    this.httpBody.append('SelPos',  this.responseOptions.HistoryCount );
                    this.httpBody.append('session', this.responseInfos.session);
                    this.httpBody.append('Action', 'Q_FAMCLOSE');
                    this.httpBody.append('referer', this.apiLink);
                    this.httpBody.append('cdstage', this.responseInfos.cdstage);
                    this.httpBody.append('svg', 'true');
                    this.httpBody.append('do_action', '1');
                    if(catologNeedUserNameAndPassWord){    
                        this.httpBody.append('username', catalogUserName);
                        this.httpBody.append('password', catalogPassWord);
                    }
                } 
                     
                    
                break;
            }
            case 'Variante': {
                this.httpBody = new FormData();
                this.httpBody.append('lang', this.responseOptions.Lang);
                this.httpBody.append('catalog', this.responseOptions.CatCode);
                this.httpBody.append('family', this.responseOptions.FamCode);
                this.httpBody.append('SelPos',  ((+this.responseOptions.HistoryCount -1)+'') );
                this.httpBody.append('session', this.responseInfos.session);
                this.httpBody.append('Action', 'Q_GOTO');
                this.httpBody.append('cdstage', this.responseInfos.cdstage);
                this.httpBody.append('svg', 'true');
                this.httpBody.append('do_action', '0');
                this.httpBody.append('SelParameter', '');
                this.httpBody.append('SelState', '0');
                this.httpBody.append('SelValue', '');
                this.httpBody.append('criterid', '0');
                if(catologNeedUserNameAndPassWord){    
                    this.httpBody.append('username', catalogUserName);
                    this.httpBody.append('password', catalogPassWord);
                }
                break;
            } 
            case 'Quit':{
                this.httpBody = new FormData();
                this.httpBody.append('lang', this.responseOptions.Lang);
                this.httpBody.append('catalog', this.responseOptions.CatCode);
                this.httpBody.append('family', this.responseOptions.FamCode);
                this.httpBody.append('SelPos', this.responseOptions.HistoryCount);
                this.httpBody.append('session', this.responseInfos.session);
                this.httpBody.append('Action', 'Q_QUIT');
                this.httpBody.append('cdstage', this.responseInfos.cdstage);
                this.httpBody.append('svg', 'true');
                this.httpBody.append('do_action', '0');
                this.httpBody.append('famsel', '');
                if(catologNeedUserNameAndPassWord){    
                    this.httpBody.append('username', catalogUserName);
                    this.httpBody.append('password', catalogPassWord);
                }
                break;
            } 
            case 'Fermer': {
                this.httpBody = new FormData();
                this.httpBody.append('lang', this.responseOptions.Lang);
                this.httpBody.append('catalog', this.responseOptions.CatCode);
                this.httpBody.append('family', this.responseOptions.FamCode);
                this.httpBody.append('SelPos', this.responseOptions.HistoryCount);
                this.httpBody.append('session', this.responseInfos.session);
                this.httpBody.append('Action', 'Q_CONSCLOSE');
                this.httpBody.append('cdstage', this.responseInfos.cdstage);
                this.httpBody.append('svg', 'true');
                this.httpBody.append('do_action', '0');
                this.httpBody.append('SelParameter', '');
                this.httpBody.append('SelState', '0');
                this.httpBody.append('SelValue', '');
                if(catologNeedUserNameAndPassWord){    
                    this.httpBody.append('username', catalogUserName);
                    this.httpBody.append('password', catalogPassWord);
                }
                break;
            } 
            case 'OpenCatalogue': {
                this.httpBody = new FormData();
                this.httpBody.append('session', this.responseInfos.session);
                this.httpBody.append('cdstage', this.responseInfos.cdstage);
                this.httpBody.append('ACE_GUI', 'Custom');
                this.httpBody.append('Action', 'Q_DBOPEN');
                this.httpBody.append('catalog', this.catalogueSelectedInCatalogueList);
                if(catologNeedUserNameAndPassWord){    
                    this.httpBody.append('username', catalogUserName);
                    this.httpBody.append('password', catalogPassWord);
                }
                break;
            }
            case 'Solutions': {
                this.httpBody = new FormData();
                this.httpBody.append('session', this.responseInfos.session);
                this.httpBody.append('catalog', this.responseOptions.CatCode);
                this.httpBody.append('family', this.responseOptions.FamCode);
                this.httpBody.append('ACE_GUI', 'Custom');
                this.httpBody.append('lang', this.responseOptions.Lang);
                this.httpBody.append('Action', 'Q_PARTPANEL');
                break;
            }
            case 'Part': {
                this.httpBody = new FormData();
                this.httpBody.append('session', this.responseInfos.session);
                this.httpBody.append('catalog', this.responseOptions.CatCode);
                this.httpBody.append('family', this.responseOptions.FamCode);
                this.httpBody.append('lang', this.responseOptions.Lang);
                this.httpBody.append('cdstage', this.responseInfos.cdstage);
                this.httpBody.append('ACE_GUI', 'Custom');
                this.httpBody.append('Action', 'Q_OPENPART');
                this.httpBody.append('partcode', this.parameter.get('Part'));
                break;
            }
            case 'ChangeLanguage': {
                this.httpBody = new FormData();
                this.httpBody.append('session', this.responseInfos.session);
                this.httpBody.append('cdstage', this.responseInfos.cdstage);
                this.httpBody.append('ACE_GUI', 'Custom');
                if(this.parameter.get('ChangeLanguage').actualPage === 'Icon'){
                    this.httpBody.append('Action', 'Q_FAMCHANGELANG');
                }else if(this.parameter.get('ChangeLanguage').actualPage === 'Recap'){
                    this.httpBody.append('Action', 'Q_CONSCHANGELANG');
                }
                this.httpBody.append('catalog', this.responseOptions.CatCode);
                this.httpBody.append('family', this.responseOptions.FamCode);
                this.httpBody.append('lang', this.parameter.get('ChangeLanguage').parameter);
                break;
            }
            case 'ProgressionBar': {
                this.httpBody = new FormData();
                this.httpBody.append('session', this.responseInfos.session);
                this.httpBody.append('cdstage', this.responseInfos.cdstage);
                this.httpBody.append('ACE_GUI', 'Custom');
                this.httpBody.append('Action', 'Q_GOTO');
                this.httpBody.append('SelPos', this.parameter.get('ProgressionBar'));
                break;
            }
        }
    } 
    

 
    //Void to call APIs,  and add the new stepto navigation step array
    async getHttpResponse(newClick: string, parameter : any): Promise<string> {

        //store the parameter in the service parameter variable
        this.parameter.set(newClick, parameter);
        //To store the command retreived
        let command : string= '';
        
        //Command is LISTINGDATA when others necessary requests are done
        if(newClick == 'A_SELLISTUPDERGO_DONE'){
            //In this case, no command will be retreived, we will concider the command LISTINGDATA
            command = 'LISTINGDATA';
        }
        
        //create the httpbody(formData variable) according to the requestName
        this.createHttpBody(newClick);

        //If it's a listing data case, the api call will be performed in the data-list component
        if(command != 'LISTINGDATA'){
            //Perform a http request
            await this.performHttpRequest();
            //Retreive command from response
            command = this.data.command;
        }

        //If the answer of the server is an error
        if(command === 'A_ERROR'){
            this.modifyResponseQping(this.data.options);
        }  


        //update infos, options, content and topbar informations from new retreved data
        this.updateInfosOptionsContentEtc();
        

        //Create or update steps, to save for each step lastClickToAchiveThisStep, path, requestName, command and httpRequestBody
        this.createUpdateNavigationSteps(newClick, command);     

        return command;
          
    }

    async performHttpRequest(){
        try{
            this.data =  await this.httpClient.post<any[]>(this.apiLink, this.httpBody).toPromise();
            
        } catch{
            console.log('Error retreving data in retreiveHtttpDataService :  this.data =  await this.httpClient.post<any[]>(this.apiLink, this.httpBody).toPromise(); ');
        } 
    }


    createUpdateNavigationSteps(newClick: string, command: string){
            //What ever the value of the requestName the buildDataAccordingToCommand will be called to store and send retreived data
            //However, according to the requestName, a new step will be created or new data will be added in the existing newNavigationStep

            if(['ByReference', 'OneIconClicked', 'Filter', 'Search', 'Back', 'Quit', 'Ok', 'Variante', 'Fermer', 'Login', 'OpenCatalogue', 'Solutions', 'Part', 'ChangeLanguage', 'ProgressionBar'].includes(newClick)){

                //Check on the command, if it is coorrectly retreived then call buildDataAccordingToCommand
                if (!(command == null || command == '')){
                
                    if(newClick== 'Filter'){
                        this.filterSearchService.filtredToTrue();
                    } 

                    //Create a new step with all parameters except the path (to be filled by routingService)
                    this.navigationStepsService.createNewStep(newClick, '', [newClick], [command], [this.httpBody]);


                } else{ 
                    //Create a new step with all parameters except the path (to be filled by routingService) and command (no command was retreived)
                    this.navigationStepsService.createNewStep(newClick, '', [newClick], [''], [this.httpBody]);

                    console.log('No command reurned by the HttpRequest. httpRequestName : '+ newClick + ' HttpRequestBody : ' + this.httpBody );
                }
            } 
            else if (['A_GOSELPANEL_DONE', 'A_SELUPDERGO_DONE', 'A_SPEC_DONE' ,'A_SELLISTUPDERGO_DONE', 'A_GOCONSPANEL_DONE'].includes(newClick)){
                //Check on the command, if it is coorrectly retreived then call buildDataAccordingToCommand
                if (!(command == null || command == '')){
                    //Update (MAJ) the new step by pushing new values in the arrays requestName, command, httpbody
                    this.navigationStepsService.addNewCommand(command);
                    this.navigationStepsService.addNewHttpRequestBody(this.httpBody);
                    this.navigationStepsService.addNewRequestName(newClick);

                } else{ 
                    //Update (MAJ) the new step by pushing new values in the arrays requestName, command, httpbody
                    this.navigationStepsService.addNewCommand('');
                    this.navigationStepsService.addNewHttpRequestBody(this.httpBody);
                    this.navigationStepsService.addNewRequestName(newClick);

                    console.log('No command reurned by the HttpRequest. httpRequestName : '+ newClick + ' HttpRequestBody : ' + this.httpBody );
                }
            }  
    }


    //update infos, options, content and topbar informations from new retreved data
    updateInfosOptionsContentEtc(){
        this.updateInfos(this.data.infos);
        this.updateOptions(this.data.options);
        this.updateContent(this.data.content);
        this.updateDefaultIntro(this.data.messages);
        this.updateTopBarInformations(this.data);
        this.updateTopBar();
    }

    updateInfos(infos: any): void{
        if(infos != null){ 
            let modified = false;
            if(infos.session != null){
                this.responseInfos.session = infos.session;
                modified = true;
            } 
    
            if(infos.cdstage!=null){
                this.responseInfos.cdstage = infos.cdstage;
                modified = true;
            }
            if(modified){
                this.emitResponseInfos();
            }
        }
    }
    
    updateOptions(options: any): void{
        if(options != null){
            let modified = false;
            if(options.Lang != null){
                this.responseOptions.Lang = options.Lang;
                modified = true;
            } 
    
            if(options.CatCode != null){
                this.responseOptions.CatCode = options.CatCode;
                modified = true;
            } 
    
            if(options.FamCode != null){
                this.responseOptions.FamCode = options.FamCode;
                modified = true;
            } 
    
            if(options.HistoryCount!= null){
                this.responseOptions.HistoryCount = options.HistoryCount;
                modified = true;
            } 
            if(options.progression!= null){
                this.responseOptions.progression = options.progression;
                modified = true;
            }
            if(options.infos!= null){
                this.responseOptions.infos = options.infos;
                modified = true;
            }
            if(options.ErrorCode!= null){
                this.responseOptions.ErrorCode = options.ErrorCode;
                modified = true;
            }
            if(options.Error!= null){
                this.responseOptions.Error = options.Error;
                modified = true;
            }
            if(modified){
                this.emitResponseOptions();
            }
        } 
    }

    updateContent(content: any): void{
        if(content != null){
            this.responseContent = content;
            this.emitResponseContent();
            this.headerService.modifyMainImg(content.image.URL);
            this.headerService.modifyTitle(content.Symbol);
        }
    }
    
    updateTopBarInformations(data: any): void{
        if(data.memos != null){
            this.responseMemos = data.memos;
            this.emitResponseMemos();
        }
        if(data.images != null){
            this.responseImages = data.images;
            this.emitResponseImages();
        }
        if(data.objects != null){
            this.responseObjects = data.objects;
            this.emitResponseObjects();
        }
        if(data.specs != null){
            this.responseSpecs = data.specs;
            this.emitResponseSpecs();
        }      
        if(data.helps != null){
            this.responseHelps = data.helps;
            this.emitResponseHelps();
        }
        if(data.langs != null){
            this.responseLangs = data.langs;
            this.emitResponseLangs();
        }
    }
    
    updateDefaultIntro(messages: any): void{
        if(messages != null){
            if(messages.$DEFAULT_$INTRO != null || messages.$DEFAULT_$CONSULTFORM !=null){
                if(messages.$DEFAULT_$INTRO != null){
                    this.responseDefaultIntro = messages.$DEFAULT_$INTRO;
                    this.emitResponseDefaultIntro();
                }
                else{
                    this.responseDefaultIntro = {...this.responseDefaultIntro, ...messages.$DEFAULT_$CONSULTFORM};
                    this.emitResponseDefaultIntro();
                }
            }
        }
    }
    

    updateTopBar(): void{
        //update names
        if(this.responseDefaultIntro != null){
            this.topBar[0].name = this.responseDefaultIntro.B_Memo;
            this.topBar[1].name = this.responseDefaultIntro.B_Image;
            this.topBar[2].name = this.responseDefaultIntro.B_Obj;
            this.topBar[3].name = this.responseDefaultIntro.B_Spec;
            this.topBar[4].name = this.responseDefaultIntro.B_Help;
        }

        //update item list to be formated {'type' : 'm, i, s..', 'name' : element.Name, 'file' : element.Code}
        if(this.responseMemos != null){
            const formatedMemos = this.formatMemos(this.responseMemos);
            this.topBar[0].items = formatedMemos;
        }
        if(this.responseImages != null){
            const formatedImages = this.formatImages(this.responseImages);
            this.topBar[1].items = formatedImages;
        }
        if(this.responseObjects != null){
            const formatedObjects = this.formatObjects(this.responseObjects);
            this.topBar[2].items = formatedObjects;
        }
        if(this.responseSpecs != null){
            const formatedSpecs = this.formatSpecs(this.responseSpecs);
            this.topBar[3].items = formatedSpecs;
        }
        if(this.responseHelps != null){
            const formatedHelps = this.formatHelps(this.responseHelps);
            this.topBar[4].items = formatedHelps;
        }
        this.emitTopBar();
    }

    //Voids to get memos, images, helps, objects and specs fromatted {'id': ('type' for memos, 'i' for images ...), 'name' : , 'file' : }
    //This formating will help to display this informations into a devextreme menu component
    formatMemos(memos: any): any[]{
        let result: any[]=[];
        let resultCounter=0;
        memos.forEach((element: any) => {
            result[resultCounter]= {
                'type' : 'm',
                'name' : element.Name,
                'file' : element.Code
            };
            resultCounter++;
        });
        return result;
    }

    formatImages(images: any): any[]{
        let result: any[]=[];
        let resultCounter=0;
        images.forEach((element: any) => {
            result[resultCounter]= {
                'type' : 'i',
                'name' : element.Title,
                'file' : element.Code
            };
            resultCounter++;
        });
        return result;
    }

    formatObjects(objects: any): any[]{
        let result: any[]=[];
        let resultCounter=0;
        objects.forEach((element: any) => {
            result[resultCounter]= {
                'type' : 'o',
                'name' : element.Name,
                'file' : element.Code
            };
            resultCounter++;
        });
        return result;
    }

    formatSpecs(specs: any): any[]{
        let result: any[]=[];
        let resultCounter=0;
        specs.forEach((element: any) => {
            result[resultCounter]= {
                'type' : 's',
                'name' : element.Name,
                'file' : element.Code
            };
            resultCounter++;
        });
        return result;
    }

    formatHelps(helps: any): any[]{
        let result: any[]=[];
        let resultCounter=0;
        helps.forEach((element: any) => {
            result[resultCounter]= {
                'type' : 'h',
                'name' : element.Name,
                'file' : element.Code
            };
            resultCounter++;
        });
        return result;
    }

    // Void to build store, send data in the right variable/Subject according to command
    buildDataAccordingToCommand(command: string):void {
        switch (command) {
            case 'A_GODBPANEL':{
                //Assign retreived data to varible to be used later by other components
                this.catalogues = this.data.catalogs;

                //send new catalogue list
                this.emitCatalogues();

                break;
            }
            case 'A_GOFAMPANEL':{
                //Asseign retreived data to variable of type Icon[] 
                this.icons = this.data.famicons;

                //send new icons values
                this.emitIcons();
                
                break;
            } 
            case 'A_GOSELPANEL':{
                 //Asseign retreived data to variable of type ContentAGOSELPANEL
                 this.contentAGOSELPANEL = this.data.content;

                 //send new ContentAGOSELPANEL values
                 this.emitContentAGOSELPANEL();

                break;
            } 
            case 'A_SELUPDERGO':{

                //Asseign retreived data to variable of type DatasASELUPDERGO
                this.datasASELUPDERGO = this.data;
                
                //send new DatasASELUPDERGO values
                this.emitDatasASELUPDERGO();
                
                //Cast of new data.
                this.castPossibleValuesToDataSource(false);

                //send new values
                this.emitSelectBoxDatas();
                
                this.formatDatasASELUPDERGO();
                
               break;
            }
            case 'A_SELLISTUPDERGO':{
                //Asseign retreived data to variable of type columnsA_SELLISTUPDERGO
                this.columnsA_SELLISTUPDERGO = this.castToArray(this.data.init.columns);

                //send new columnsA_SELLISTUPDERGO values
                this.emitColumnsA_SELLISTUPDERGO();

                break;
            } 
            case 'A_SPEC':{
                //Asseign retreived data to specASPEC
                this.specASPEC = this.data.spec;

                //send new specASPEC values
                this.emitSpecASPEC();

                break;
            } 
            case 'A_GOCONSPANEL':{
                //Modify header title and picture
                this.headerService.modifyTitle(this.data.content.Symbol);
                this.headerService.modifyMainImg(this.data.content.image.URL);

                //Asseign retreived data to variable of type A_GOCONSPANEL
                this.contentA_GOCONSPANEL = this.data.content;

                //send new formFieldsA_GOCONSPANEL values
                this.emitContentA_GOCONSPANEL();

                break;
            } 
            case 'A_CONSUPDERGO':{
                //Asseign retreived data to variable of type A_CONSUPDERGO
                this.criteriaA_CONSUPDERGO = this.data.criteria;

                //send new A_CONSUPDERGO values
                this.emitCriteriaA_CONSUPDERGO();

                break;
            } 
            case 'A_PARTPANEL':{
                this.partsA_PARTPANEL = this.data.parts;
                this.emitPartsA_PARTPANEL();
                break;
            }
        } 
    } 


    //Void used to update the boxDatas, it is called in the configurator when selecting new element in the data grid
    updateSelectBoxDatas(data: any): void{
        //Asseign retreived data to variable of type DatasASELUPDERGO
        this.datasASELUPDERGO = data;

        //send new DatasASELUPDERGO values
        this.emitDatasASELUPDERGO();

        
        //Cast of new data.
        this.castPossibleValuesToDataSource(true);
        
        //send new values
        this.emitSelectBoxDatas();


        this.formatDatasASELUPDERGO();
    } 


    formatDatasASELUPDERGO(): void{
        const criteria = this.toArray(this.datasASELUPDERGO.datas.criteria);
        
        let formatedParameters : any[] = [];
        criteria.forEach(element => {
            formatedParameters = formatedParameters.concat(this.toArray(element.parameters));
        });

        this.formatedDatasASELUPDERGO = formatedParameters;
        this.emitFormatedDatasASELUPDERGO();

    }    

    //Void called to cast retreived data from command A_SELUPDERGO (possible values for each criteria) to datasource
    //It returns currentValues when possibleValues is empty
    castPossibleValuesToDataSource(isCalledWhenSeLLISTCHANGE: boolean): void {
        //Data used to get possible values for each criteria
        //We cast this possible values into a DATASOURCE to make a pagination possible in selectBox when list of possible values exceeeds a threshold
        this.parameters=[];
        const criteria : any= this.datasASELUPDERGO.datas.criteria;
        if(Array.isArray(criteria)){
            criteria.forEach(element => {
                this.parameters = this.parameters.concat(this.castToArray(element.parameters));
            });
        }else{
            this.parameters = this.castToArray(criteria.parameters);
        }
        
        if(!isCalledWhenSeLLISTCHANGE){ 
                //Initialize array of selectbox data
                this.selectBoxDatas=[]; 
                //Initialize filters
                this.filterSearchService.initializeFilters();

                this.parameters.forEach(
                (parameter: any, index) => {
                    //Add filters
                    if(parameter.Status=='SELSPEC' || parameter.Status=='KBDSPEC'){
                        this.filterSearchService.newFilter(parameter.Code, parameter.currvalues)
                    } 

                    const possvaluesArray = this.castToArray(parameter.possvalues);
                    const currvaluesArray = this.castToArray(parameter.currvalues);
                    let store: any[] =[];
                    
                    if(possvaluesArray.length == 0 && currvaluesArray.length == 0){
                            store.push('          '); 
                    } 
                    else if(possvaluesArray.length == 0){
                            store= currvaluesArray;
                    } else{
                            store= possvaluesArray;
                    }  

                    //Add criteria code and store only and only if it has Valid true or Valid not mentioned
                    if(parameter.Valid=='true' || parameter.Valid==null){ 
                        if(parameter.possvalues.length>thresholdSelectBox){
                            this.selectBoxDatas.push({  'code': parameter.Code, 
                                                        'data': new DataSource({
                                                        store: store,
                                                        paginate: true,
                                                        pageSize: pageSizeSelectBox
                                                        })
                                                    });
                        } 
                        else{
                            this.selectBoxDatas.push({  'code': parameter.Code,
                                                        'data': new DataSource({
                                                        store: store
                                                        })
                                                    });
                        } 
                    }else{
                        this.selectBoxDatas.push({  'code': 'criteria not allowed to be displayed',
                                                        'data': new DataSource({
                                                        store: [] 
                                                        })
                                                    });
                    }  
                }
                ); 
        }
        //Else : enter condition when calling Q__SELLISTCHANGE , in order to update possible values for selected elements
        else{
            this.parameters.forEach(
                (parameter: any, index) => {
                    //Add filters
                    if(parameter.Status=='SELSPEC'){
                        const possvaluesArray = this.castToArray(parameter.possvalues);
                        const currvaluesArray = this.castToArray(parameter.currvalues);
                        let store: any[] =[];
                        if(possvaluesArray.length == 0 && currvaluesArray.length == 0){
                            store.push('          '); 
                        } 
                        else if(possvaluesArray.length == 0){
                                store= currvaluesArray;
                        } else{
                                store= possvaluesArray;
                        }  

                        //Remplace the old value, with the new value
                        this.selectBoxDatas.forEach((element, index) => {
                            if(element.code==parameter.Code){
                                this.selectBoxDatas[index] = {  'code': parameter.Code,
                                                                'data': new DataSource({
                                                                    store: store
                                                                    })
                                                            };
                            } 
                        });
                    } 
                }
            ); 
        } 

    }

    castToArray(element: any): any[]{
            let result : any[] = [];
            if(!Array.isArray(element) && element!=''){
                result.push(element);
            } 
            else{
                result = element;
            } 
            return result;
    }  

    toArray(object: any): any[]{
        if(Array.isArray(object)){
          return object
        }else{
          let array : any[]=[];
          array.push(object);
          return array;
        }
    }

    modifySpecAspec(newSpecAspec: any): void{
        this.specASPEC= newSpecAspec;
        this.emitSpecASPEC();
    } 

    async lunchQping():Promise<void>{ 
        let httprequest = new FormData();
        let resData : any;
        httprequest.append('session', this.responseInfos.session);
        httprequest.append('Action', 'Q_PING');
        if(catologNeedUserNameAndPassWord){    
            httprequest.append('username', catalogUserName);
            httprequest.append('password', catalogPassWord);
        }
        //Perform a http request
        try{
            resData =  await this.httpClient.post<any[]>(this.apiLink, httprequest).toPromise();
            if(resData.options!= null){
                this.responseQPING = resData.options;
            } else{
                this.responseQPING = {'ERRCODE' : '', 'ERRMSG' : ''};
            } 
            this.emitResponseQPING();
        } catch{
            console.log('Error retreving data in retreiveHtttpDataService, lunchQping function');
        } 
    } 


    resetResponseQping(){
        this.responseQPING = {'ERRCODE' : '', 'ERRMSG' : ''} ;
        this.emitResponseQPING();
    } 

    modifyResponseQping(newResponseQping: any){
        this.responseQPING = newResponseQping ;
        this.emitResponseQPING();
    }     

    async getResponseForTopBarRequest(file: string, type: string){
        let httprequest = new FormData();
        httprequest.append('session', this.responseInfos.session);
        httprequest.append('ACE_GUI', 'Custom');
        httprequest.append('svg', 'true');
        switch (type){
            case 'i' : {
                httprequest.append('Action', 'Q_IMAGE');
                break;
            }
        }
        httprequest.append('catalog', this.responseOptions.CatCode);
        httprequest.append('family', this.responseOptions.FamCode);
        httprequest.append('code', file);
        if(catologNeedUserNameAndPassWord){    
            httprequest.append('username', catalogUserName);
            httprequest.append('password', catalogPassWord);
        }
        //Perform a http request
        try{
            this.responseForTopBarRequest =  await this.httpClient.post<any[]>(this.apiLink, httprequest).toPromise();
            this.emitResponseForTopBarRequest();
            
        } catch{
            console.log('Error retreving data in retreiveHtttpDataService, getResponseForTopBarRequest function');
        } 
    }

    resetPartsA_PARTPANEL(): void{
        this.partsA_PARTPANEL = [];
        this.emitPartsA_PARTPANEL();
    }


    async getPicturesForImgSelection(codeParameter: string): Promise<void>{
        let httprequest = new FormData();
        httprequest.append('session', this.responseInfos.session);
        httprequest.append('ACE_GUI', 'Custom');
        httprequest.append('Action', 'Q_ASSISTIMG');
        httprequest.append('catalog', this.responseOptions.CatCode);
        httprequest.append('family', this.responseOptions.FamCode);
        httprequest.append('selparameter', codeParameter);
        httprequest.append('format', 'png|gif|jpg');
        try{
            const data:any =  await this.httpClient.post<any[]>(this.apiLink, httprequest).toPromise();
            this.responseImgSelection.set(codeParameter, data.content);
            this.emitResponseImgSelection();
        } catch{
            console.log('Error retreving data in retreiveHtttpDataService, getPicturesForImgSelection function');
        } 
    }

} 

