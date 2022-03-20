import { navigationSteps } from './../Shared/Constantes';
import { NavigationStep } from './../../TechnicalModels/NavigationStep.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()

export class NavigationStepsService{

    //Private variable to save the history of navigation steps, it's accessible throw observable subscription
    private navigationSteps: NavigationStep[];
    navigationStepsSubject = new Subject<NavigationStep[]>();

    //Public variable to store the new step attribute while filling them by retreiveHttpDataService and routingService
    private newStep: NavigationStep;
    
    //Private variable usued to know the page to go to when back is clicked. The page in this variable is represented by an index of the navigation step array
    private pointerWhereToBack: number;

    constructor(){
        
        this.newStep = new NavigationStep('', '', [], [], []);  
        this.navigationSteps = navigationSteps;
        this.pointerWhereToBack = this.navigationSteps.length-1;
    } 

    //Void to update (mettre à jour) the value of navigationSteps to subscriptions
    emitNavigationSteps(): void{
        this.navigationStepsSubject.next(this.navigationSteps.slice());
    }

    //Void to create a new step and store it in the newStep variable
    createNewStep(lastClickToAchiveThisStep: string, path: string, requestName: string[], command: string[], httpRequestBody: FormData[]): void{
        this.newStep = new NavigationStep(lastClickToAchiveThisStep, path, requestName, command, httpRequestBody);
    }

    //Void to add a new command in the command array of the newStep
    addNewCommand(command: string): void{
        this.newStep.command.push(command);
    } 

    //Void to add a new requestName in the requestName array of the newStep
    addNewRequestName(requestName: string): void{
        this.newStep.requestName.push(requestName);
    } 

    //Void to add a new httpRequestBody in the httpRequestBody array of the newStep
    addNewHttpRequestBody(httpRequestBody: FormData): void{
        this.newStep.httpRequestBody.push(httpRequestBody);
    } 

    //Function returns the command of the new step
    getLastCommandOfNewStep(): string {
        return this.newStep.command[this.newStep.command.length -1];
    } 

    //Void to put path to the new step
    putPathOnNewStep(path: string): void{
        this.newStep.path = path;
    } 

    //Void to put lastClickToAchiveThisStep to the new step
    putLastClickToAchiveThisStep(lastClickToAchiveThisStep: string): void{
        this.newStep.lastClickToAchiveThisStep = lastClickToAchiveThisStep;
    } 

    //Void to push the new the new step in the navigation step array and then reinizialise it 
    pushNewStepInNavigationSteps(): void{
        this.navigationSteps.push(this.newStep);
        this.emitNavigationSteps();
        this.newStep = new NavigationStep('', '', [], [], []); 
    } 

    //Function returns the httpbody to get the last page: used when back is clicked
    getWhereToBackHttpbody(): FormData{
        return this.navigationSteps[this.pointerWhereToBack].httpRequestBody[0]; 
    }

    //Function returns the path of the last page visited. Used when Back is clicked
    getWhereToBackPath(): string{
        return this.navigationSteps[this.pointerWhereToBack].path; 
    } 

    getActualPath(): string{
        return this.navigationSteps[this.navigationSteps.length-1].path; 
    } 

    getLastStep(): any{
        return this.navigationSteps[this.navigationSteps.length-1];
    }

    getNavigationSteps(): any{
        return this.navigationSteps;
    }

    //Void used to update the pointerWhere to back. It's the first thing to be called when the back button is clicked.
    updatePointerWhereToBack(backIsClicked: boolean): void{
        if(backIsClicked){
            this.pointerWhereToBack--;
        } 
       else {
            this.pointerWhereToBack = this.navigationSteps.length-2;
        } 
    } 


} 