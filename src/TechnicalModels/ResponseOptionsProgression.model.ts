//This is a data model used to descripe the Progression object in the Options part of a http response
//It is managed in the retreveHttpData service
export class ResponseOptionsProgression{
    constructor(
       public pattern: string,
       public famname: string
       ){} 
}