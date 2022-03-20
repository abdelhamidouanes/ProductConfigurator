import { NavigationButton } from './../../TechnicalModels/NavigationButton.model';
import { Subject, Subscription } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { navigationButtons } from '../Shared/Constantes';
import { RetreiveHttpDataService } from './retreiveHttpData.service';
@Injectable()

export class FooterService implements OnDestroy{
   
    //Private variable to manage navigation buttons
    private navigationButtons : NavigationButton[];
    
    //Subject to send navigation buttons data throw subscription
    navigationButtonsSubject = new Subject<NavigationButton[]>();

    responseDefaultIntro: any;
    responseDefaultIntroSubscription: Subscription;

    constructor(private retreiveHttpDataService: RetreiveHttpDataService){
        this.navigationButtons = navigationButtons;

        this.responseDefaultIntroSubscription = this.retreiveHttpDataService.responseDefaultIntroSubject.subscribe( data => {
            this.responseDefaultIntro = data;
            if(this.responseDefaultIntro!= null){
                this.setButtonsTitlesAccordingToTraduction();
            }
        });
        this.retreiveHttpDataService.emitResponseDefaultIntro();

    } 
    ngOnDestroy(): void {
        this.responseDefaultIntroSubscription.unsubscribe();
    }

    //Void to update (mettre à jour) the value of navigation buttons to subscriptions
    emitNavigationButtons() : void{
        this.navigationButtonsSubject.next(this.navigationButtons);
    } 


    setButtonsTitlesAccordingToTraduction(): void{
        if(this.responseDefaultIntro.M_Quit!=null){
            this.updateButtonTitle('Q', this.responseDefaultIntro.M_Quit);
        }
        if(this.responseDefaultIntro.B_Close!=null){
            this.updateButtonTitle('B', this.responseDefaultIntro.B_Close);
        }
        if(this.responseDefaultIntro.B_Variant!=null){
            this.updateButtonTitle('V', this.responseDefaultIntro.B_Variant);
        }
        if(this.responseDefaultIntro.B_Reset!=null){
            this.updateButtonTitle('R', this.responseDefaultIntro.B_Reset);
        }
        if(this.responseDefaultIntro.B_OK!=null){
            this.updateButtonTitle('O', this.responseDefaultIntro.B_OK);
        }
        if(this.responseDefaultIntro.B_Last!=null){
            this.updateButtonTitle('VA', this.responseDefaultIntro.B_Last);
        }
        if(this.responseDefaultIntro.B_Close!=null){
            this.updateButtonTitle('F', this.responseDefaultIntro.B_Close);
        }
        if(this.responseDefaultIntro.B_Part!=null){
            this.updateButtonTitle('S', this.responseDefaultIntro.B_Part);
        }
    }

    //Void to activate and display only the buttons given in the parameters
    displayOnly(buttonsCode: string[] | undefined  ) : void{
        if(buttonsCode!=null){ 
            this.navigationButtons.forEach( (navBtn, index) => {
                if(buttonsCode.includes(navBtn.code)){
                    this.navigationButtons[index].display=true;
                } else {
                    this.navigationButtons[index].display=false;
                } 
            });
        }
        this.emitNavigationButtons();
    } 

    //A function to modifie the path attribute of a button, it takes a button code and a path as parameters and modifie the array of navigation buttons according to these parameters
    //It returns a boolean to indicate if the modification is ok 
    modifiePathButton(buttonCode : string, path : string): boolean{
        let ok: boolean = false; 
        for(let i = 0; i < this.navigationButtons.length; i++){
            if (this.navigationButtons[i].code === buttonCode){
                    this.navigationButtons[i].path = path;
                    this.emitNavigationButtons();
                    ok = true;
            }
        }
        return ok;
    } 

    //A function to modifie the display attribute of a button to true, it takes a button code and modifie the array of navigation buttons according to this parameter
    //It returns a boolean to indicate if the modification is ok 
    diplayButton(buttonCode : string): boolean{
        let ok: boolean = false; 
        for(let i = 0; i < this.navigationButtons.length; i++){
            if (this.navigationButtons[i].code === buttonCode){
                    this.navigationButtons[i].display = true;
                    this.emitNavigationButtons();
                    ok = true;
            }
        }
        return ok;
    } 

    //A function to modifie the display attribute of a button to false, it takes a button code and modifie the array of navigation buttons according to this parameter
    //It returns a boolean to indicate if the modification is ok 
    hideButton(buttonCode : string): boolean{
        let ok: boolean = false; 
        for(let i = 0; i < this.navigationButtons.length; i++){
            if (this.navigationButtons[i].code === buttonCode){
                    this.navigationButtons[i].display = false;
                    this.emitNavigationButtons();
                    ok = true;
            }
        }
        return ok;
    } 

    //A function to modifie the active attribute of a button to true, it takes a button code and modifie the array of navigation buttons according to this parameter
    //It returns a boolean to indicate if the modification is ok 
    activationButton(buttonCode: string): boolean{
        let ok: boolean = false; 
        for(let i = 0; i < this.navigationButtons.length; i++){
            if (this.navigationButtons[i].code === buttonCode){
                    this.navigationButtons[i].active = true;
                    ok = true;
            }
        }
        this.emitNavigationButtons();
        return ok;
    } 


    //A function to modifie the active attribute of a button to false, it takes a button code and modifie the array of navigation buttons according to this parameter
    //It returns a boolean to indicate if the modification is ok 
    desactivationButton(buttonCode: string): boolean{
        let ok: boolean = false; 
        for(let i = 0; i < this.navigationButtons.length; i++){
            if (this.navigationButtons[i].code === buttonCode){
                    this.navigationButtons[i].active = false;
                    ok = true;
            }
        }
        this.emitNavigationButtons();
        return ok;
    } 

    updateButtonTitle(code: string, newTitle: string): void{
        this.navigationButtons.forEach((element, index) => {
            if(element.code === code && element.title != newTitle){
                this.navigationButtons[index].title = newTitle; 
            }
        });
    }
    
} 