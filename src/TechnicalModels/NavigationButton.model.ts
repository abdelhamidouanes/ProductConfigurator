//This is a data model used to descripe the buttons in the main footer (navigation bar) of the webSite
//It is managed in the navigationFooreterService
export class NavigationButton{
    constructor(
        public code : string,
        public title : string,
        public path : string,
        public description : string,
        public active : boolean,
        public display : boolean,
        public buttonOnLeft : boolean,
        public fontAwesomeClass : string,
        public iconName : string
    ){}

}