import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Header } from 'src/TechnicalModels/Header.model';
import { constHeader} from '../Shared/Constantes';
@Injectable()

export class HeaderService{

   //private variable to manage the header
   private header: Header;
   headerSubject = new Subject<Header>();
   
   constructor(){
    this.header = constHeader;
   }
   
   //Void to update (mettre à jour) the value of header to subscriptions
   emitHeader(): void{
       this.headerSubject.next(this.header);
   } 

   //void to modify the main title of the header 
   modifyTitle(mainTitle: string):void{
       this.header.mainTitle = mainTitle;
       this.emitHeader();
   } 

   //void to modify the main image of the header
   modifyMainImg(mainImg : string): void{
       this.header.mainImg = mainImg;
       this.emitHeader();
   } 

} 