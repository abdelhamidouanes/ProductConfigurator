//This is a data model used to descripe the Infos object in the Options part of a http response
//It is managed in the retreveHttpData service
export class ResponseOptionsInfos{
    constructor(
       public AutoMemo : string,
       public AutoImage : string,
       public IsGuide : string,
       public Objs : string,
       public Specs : string,
       public Cads : string,
       public Parts : string
       ){} 
}