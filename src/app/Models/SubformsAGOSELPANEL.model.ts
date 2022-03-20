// This data model represent the data structure of the response 
// to the request (exemple) lang=fr&catalog=eCATALOG&family=ecatalog_pintro&SelPos=&session=PHPSESSID_60bdddb390e88&Action=Q_SELECTFAM&cdstage=1&svg=true&do_action=0&famsel=electric_frelais
// exactly the subforms object of the content part of the response
import { FormfieldAGOSELPANEL } from "./FormfieldAGOSELPANEL.model";
import { ImageSubforms } from "./ImageSubforms.model";


export class SubformsAGOSELPANEL{
    constructor(
        public Caption : string,
        public CaptionCode : string,
        public CriterId : string,
        public Style : string,
        public Options : string,
        public Name : string,
        public Symbol : string,
        public ToolTipText : string,
        public image : ImageSubforms,
        public formfields : FormfieldAGOSELPANEL[] 
    ){}
}