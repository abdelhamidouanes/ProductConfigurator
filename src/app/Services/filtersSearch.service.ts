import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()

export class FilterSearchService{
    
    private filters :  Map<string, any> ;
    filtersSubject = new Subject<Map<string, any>>();

    private filtred : boolean;
    filtredSubject = new Subject<boolean>();

    private selectedItem: Map<string, string> = new Map();
    selectedItemSubject =new Subject<Map<string, string> >();

    private laxModeActive: Map<string, boolean>;
    laxModeActiveSubject = new Subject<Map<string, boolean>>();

    constructor(){
        this.filtred = true;
        this.filters = new Map();
        this.laxModeActive = new Map();
    }


    emitLaxModeActive(): void{
        this.laxModeActiveSubject.next(this.laxModeActive);
    } 

    emitSelectedItem(): void{
        this.selectedItemSubject.next(this.selectedItem);
    } 

    emitFilters(): void{
        this.filtersSubject.next(this.filters);
    } 

    emitFiltred(): void{
        this.filtredSubject.next(this.filtred);
    } 

    newFilter(code: string, value: any){
        this.filters.set(code, value);
        this.emitFilters();
    } 

    deleteFilter(code: string) { 
        this.filters.delete(code);
        this.emitFilters();
    } 

    clearFilter(){
        this.filters = new Map();
        this.emitFilters();
    } 

    initSelectedItem(): void{
        this.selectedItem.clear();
        this.emitSelectedItem();
    }

    selectedItemFilling(item: any): void{
        this.selectedItem.clear();
        for (const key in item) {
            this.selectedItem.set(key, item[key]);
        }
        this.emitSelectedItem();
    } 


    selectedItemUpdate(criterias: any): void{
        this.selectedItem.clear();
        criterias = this.toArray(criterias);
        criterias.forEach((items: any) => {
            const parameters = this.toArray(items.parameters);
            parameters.forEach((item: any) => {
                const currvaluesArray = this.toArray(item.currvalues);
                if(currvaluesArray.length==1){
                    this.selectedItem.set(item.Code, currvaluesArray[0]);
                }  
            });
        });
        this.emitSelectedItem();
    } 

    filtredToTrue():void{
        this.filtred = true;
        this.emitFiltred();
    } 

    filtredToFalse(): void{
        this.filtred = false;
        this.emitFiltred();
    } 


    getFiltred(): boolean{
        return this.filtred;
    } 


    modifyLaxModeActive(code: string, value: boolean): void{
        this.laxModeActive.set(code, value);
        this.emitLaxModeActive();
    } 

    initializeLaxModeActive(): void{
        this.laxModeActive.forEach((element, key) => {
            this.filters.set(key, null);
        });
        this.laxModeActive = new Map();
        this.emitLaxModeActive();
    } 


    initializeFilters(): void{
        this.filters = new Map();
        this.emitFilters();
    } 

    toArray(object: any): any{
        if(Array.isArray(object)){
          return object
        }else{
          let array : any[]=[];
          array.push(object);
          return array;
        }
    }

}
