//This is a data model used to descripe the Options part of a http response

import { ResponseOptionsInfos } from "./ResponseOptionsInfos.model";
import { ResponseOptionsProgression } from "./ResponseOptionsProgression.model";

//It is managed in the retreveHttpData service
export class ResponseOptions{
    constructor(
       public Lang : string,
       public CatCode : string,
       public FamCode : string,
       public HistoryCount : string,
       public BackupHistoryCount : string,
       public ErrorCode : string,
       public Error : string,
       public progression : ResponseOptionsProgression,
       public infos : ResponseOptionsInfos
    ){}
}