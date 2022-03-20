// This data model represent the data structure of the response 
// to the request (exemple) lang=fr&catalog=eCATALOG&family=ecatalog_pintro&SelPos=&session=PHPSESSID_60bdddb390e88&Action=Q_SELECTFAM&cdstage=1&svg=true&do_action=0&famsel=electric_frelais
// exactly the formfields in the subforms object of the content part of the response


export class FormfieldAGOSELPANEL{
    constructor(
        public Code : string,
        public Label : string,
        public ToolTipText : string,
        public Pattern : string,
        public Style : string,
        public Options : string,
        public ParamFlags : string,
        public CriterId : string,
        public Type : string,
        public Format : string,
        public Required : string
    ){}
}