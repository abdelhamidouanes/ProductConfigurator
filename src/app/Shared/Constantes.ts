import { NavigationStep } from './../../TechnicalModels/NavigationStep.model';
import { Header } from './../../TechnicalModels/Header.model';
import { NavigationButton } from './../../TechnicalModels/NavigationButton.model';

//Catalogue name : startingcata
export const catalogName: string = 'eCATALOG';

//Constant to define whether this catalog need userName and passWord or not
export const catologNeedUserNameAndPassWord: boolean = false;

//Constants to specify user name and password to access to the catalog if needed
export const catalogUserName: string  = 'dev01';
export const catalogPassWord: string  = '';

//Constant to specify speccode parameter used in the Q_SPEC request
export const speccode: string = 'eed_szone_html';

//Folder for pictures resources
export const imgFolder = './assets/img/';

//Folder for pictures of flags 
export const imgFolderFlags = './assets/img/flags/';

//Array to define autorised paths
export const routingArray: Array<string> = ['Menu', 'Icon', 'Brands', 'Configurator', 'Article', 'Recap', 'Login', 'Catalogue'];

//Map describes the buttons to be activated for each path
export const buttonsPath : Map<string, string[] > = new Map();
buttonsPath.set('Icon', ['B', 'Q']);
buttonsPath.set('Configurator', ['B', 'Q', 'O']);
buttonsPath.set('Recap', ['F', 'Q', 'V']);
buttonsPath.set('Catalogue', ['Q', 'C']);

//Header Default values
export const constHeader: Header = {
   mainTitle : 'eConfig Selector',
   mainImg : imgFolder + 'LogoIGE.jpg'
} ;

//Array to define default navigation buttons
//By default all buttons are active and only the quit button is displayed
export const navigationButtons : NavigationButton[] = [
   {
      code : 'C',
      title : 'Open Catalogue',
      path : 'OpenCatalogue',
      description : 'Open the selected Catalogue',
      active : true,
      display : false,
      buttonOnLeft : false,
      fontAwesomeClass : 'fas fa-angle-right',
      iconName : 'next.png'
   },
   {
      code : 'S',
      title : 'Solutions',
      path : 'Solutions',
      description : 'Open Parts',
      active : true,
      display : false,
      buttonOnLeft : false,
      fontAwesomeClass : 'fas fa-th',
      iconName : 'parts.gif'
   },
   {
      code : 'Q',
      title : 'Quit',
      path : 'Quit',
      description : 'Leave to main menu',
      active : true,
      display : false,
      buttonOnLeft : true,
      fontAwesomeClass : 'fas fa-power-off',
      iconName : 'exit.png'
   },
   {
      code : 'B',
      title : 'Back',
      path : 'Back',
      description : 'Previous page',
      active : true,
      display : false,
      buttonOnLeft : true,
      fontAwesomeClass : 'fas fa-angle-left',
      iconName : 'prev.png'
   },
   {
      code : 'V',
      title : 'Variante',
      path : 'Variante',
      description : 'Go to variants',
      active : true,
      display : false,
      buttonOnLeft : false,
      fontAwesomeClass : 'fas fa-arrow-left',
      iconName : 'prev.png'
   },
   {
      code : 'R',
      title : 'Reset all',
      path : 'ResetALL',
      description : 'Reset configuration to default value ',
      active : true,
      display : false,
      buttonOnLeft : false,
      fontAwesomeClass : 'fas fa-sync-alt',
      iconName : 'lock_delete.png'
   },
   {
      code : 'O',
      title : 'Ok',
      path : 'Ok',
      description : 'Validation',
      active : true,
      display : false,
      buttonOnLeft : false,
      fontAwesomeClass : 'fas fa-angle-right',
      iconName : 'next.png'
   },
   {
      code : 'VA',
      title : 'Validate all',
      path : 'ValidateAll',
      description : 'Validate all the configuration and go to recapitulation page',
      active : true,
      display : false,
      buttonOnLeft : false,
      fontAwesomeClass : 'fas fa-angle-double-right',
      iconName : 'last.png'
   },
   {
      code : 'F',
      title : 'Fermer',
      path : 'Fermer',
      description : 'Close the recapitulation page and open icons page',
      active : true,
      display : false,
      buttonOnLeft : true,
      fontAwesomeClass : 'fas fa-angle-double-left',
      iconName : 'first.png'
   }
] ;

//Array define catalogs that uses icons instead of fontAwesome in the navigation bar
export const iconsNavigationCatalogs: Array<string> = ['BENALU', 'ECATALOG']

//Array define paths within we don't display the footer navbar
export const noFooterPaths: Array<string> = ['Menu', 'Login']; 

//Array define paths within we don't display the header
export const noHeaderPaths: Array<string> = ['Login', 'Catalogue']; 

//Array define paths within we don't display the top bar
export const noTopBarPaths: Array<string> = ['Login', 'Catalogue', 'Menu']; 

//Array to define the navigationSteps default values
export const navigationSteps : NavigationStep[] = [{lastClickToAchiveThisStep : 'FirstLoad', path: 'Menu', requestName: ['NoHttpRequest'], command: ['BootStrap'], httpRequestBody: [new FormData]}];


//threshold for possible values of a criteria in a select box
export const thresholdSelectBox: number = 100;

//Page size in a select box when threshold is exceeded
export const pageSizeSelectBox : number = 10;


//number of milisecond to relaunch the Q_ping
export const miliSecondQping : number = 30000;

//number of bulls for full screen
export const nbrBullFullScreen : number = 4;

//number of bulls for screen windowWidth<1200  && windowWidth>=1000
export const nbrBullScreen12001000 : number = 3;

//number of bulls for screen windowWidth<1000 && windowWidth>=600
export const nbrBullScreen1000600 : number = 2;

//number of bulls for screen windowWidth<600
export const nbrBullScreen600 : number = 0;

//First Page to be loaded
export const firstPageToload : string = 'Login';


//List of page where we should not lunch the q_ping (generally Login and/or Menu pages)
export const noQpingPaths : Array<string> = ['Menu', 'Login']; 

//List of catalogue that support Spec Frame
export const specCatalogs : Array<string> = ['ECATALOG'];

//Variable used in the imageViewer
export const maxZoomIn : number = 800;
export const maxZoomOut : number = 20;
export const stepBtnZoom : number = 20;
export const stepSliderZoom : number = 5;
export const stepMouseWheelZoom : number = 10;
export const realImgMapProportion : number = 3;


//List of pages where changing language is impossible
export const noChangeLanguage : Array<string> = ['Configurator'];