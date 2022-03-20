import { SubformsAGOSELPANEL } from './SubformsAGOSELPANEL.model';
import { Image } from './Image.model';
// This data model represent the data structure of the response 
// to the request (exemple) lang=fr&catalog=eCATALOG&family=ecatalog_pintro&SelPos=&session=PHPSESSID_60bdddb390e88&Action=Q_SELECTFAM&cdstage=1&svg=true&do_action=0&famsel=electric_frelais
// exactly the content part of the response


export class ContentAGOSELPANEL{

    constructor(
        public Code : string,
        public Name : string,
        public Symbol : string,
        public ToolTipText : string,
        public Stylepublic : string,
        public Options : string,
        public NoVariant : string,
        public AutoPartCode : string,
        public templatevar : string,
        public image : Image,
        public subforms : SubformsAGOSELPANEL[] 
    ){}
}