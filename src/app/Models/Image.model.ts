// This data model represent the data structure of the response 
// to the request startingcata=eCATALOG&ACE_GUI=Custom&Action=Q_INIT
// exactly the image object of the famicon part of the response/ tge image object of the content in AGOSELPANEL response
export class Image{
    constructor(
        public Code : string,
        public Height: string,
        public MimeType: string,
        public SizeX: string,
        public SizeY: string,
        public Type: string,
        public URL: string,
        public Width: string,
        public Zoom: string
    ){}
}