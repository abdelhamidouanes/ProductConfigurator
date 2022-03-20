//This is a data model used to descripe the a one step of navigation performed by a user
//It is managed in the HttpRequestAndNavigationHistory service
//It is used to store each user click and to manage the navigation forward or backward in the application
export class NavigationStep{
    constructor(
        public lastClickToAchiveThisStep: string,
        public path: string,
        public requestName: string[],
        public command: string[],
        public httpRequestBody: FormData[]
        //Maybe later we can add some other features like time spent on each page clicked items and time to get response from server ...
    ){}
}