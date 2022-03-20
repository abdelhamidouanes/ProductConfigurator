// This data model represent the data structure of the response 
// to the request (exemple) lang=fr&catalog=eCATALOG&family=ecatalog_pintro&SelPos=&session=PHPSESSID_60bdddb390e88&Action=Q_SELECTFAM&cdstage=1&svg=true&do_action=0&famsel=electric_frelais
// exactly the image object of the subforms part in the content element of the response
export class ImageSubforms{
    constructor(
        public Code : string,
        public Type: string,
        public Zoom: string,
        public SizeX: string,
        public SizeY: string,
        public URL: string,
        public MimeType: string
    ){}
}