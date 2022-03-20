// This data model represent the data structure of the response 
// to the request (exemple) SRC_eed_description_fr_keysearch=&SRC_eed_partno_keysearch=&lang=fr&catalog=eCATALOG&family=electric_frelais&SelPos=&session=PHPSESSID_60bf3f3a52452&Action=Q_SELUPDERGO&cdstage=3&svg=true&do_action=0&SelParameter=&SelState=0&SelValue=&criterid=0
// exactly the criteria object of the datas part of the response

import { ParameterASELUPDERGO } from "./ParameterASELUPDERGO.model";


export class CriteriaASELUPDERGO{
    constructor(
        public CriterId: string,
        public parameters: ParameterASELUPDERGO[] 
    ){}
}