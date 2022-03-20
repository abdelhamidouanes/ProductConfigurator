// This data model represent the data structure of the response 
// to the request startingcata=eCATALOG&ACE_GUI=Custom&Action=Q_INIT
// exactly the famicon part of the response
import { Image } from './Image.model';
export class Icon{
    constructor(
      public Code: string,
      public Name: string,
      public Symbol: string,
      public Options: string,
      public image: Image
    ){}

}