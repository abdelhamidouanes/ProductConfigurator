//This is a data model used to descripe the Infos part of a http response
//It is managed in the retreveHttpData service
export class ResponseInfos{
    constructor(
       public session : string,
       public session_id : string,
       public cdstage : string,
       public has_caddy : string
    ){}
}