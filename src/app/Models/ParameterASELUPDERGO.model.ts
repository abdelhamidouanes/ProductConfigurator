// This data model represent the data structure of the response 
// to the request (exemple) SRC_eed_description_fr_keysearch=&SRC_eed_partno_keysearch=&lang=fr&catalog=eCATALOG&family=electric_frelais&SelPos=&session=PHPSESSID_60bf3f3a52452&Action=Q_SELUPDERGO&cdstage=3&svg=true&do_action=0&SelParameter=&SelState=0&SelValue=&criterid=0
// exactly the parameter in the criteria object of the datas part of the response


export class ParameterASELUPDERGO{
    constructor(
        public Code : string,
        public Type : string,
        public Format : string,
        public Status : string,
        public MinStatus : string,
        public MaxStatus : string,
        public MinValue : string,
        public MaxValue : string,
        public currvalues : string,
        public possvalues : string[],
        public currvaluespres : string
    ){}
}