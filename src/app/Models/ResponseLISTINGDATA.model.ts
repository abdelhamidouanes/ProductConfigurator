// This data model represent the data structure of the response 
// to the request (exemple) offset=20&limit=10&session=PHPSESSID_60bf70968d258&ACE_GUI=Custom&catalog=eCATALOG&family=electric_frelais&criterid=1&options=2&Action=Q_SELLISTUPDERGO
// exactly the response object


export class ResponseLISTINGDATA{
    constructor(
        public status : string,
        public startRows : string,
        public endRows : string,
        public totalRows : string,
        public data : any[]
    ){}
}