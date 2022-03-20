    //Function returns the name of the nextHttpRequest to carry out based on the navigationSteps array (command of the last step) and the new click
    //possible returned values are ByReference, GetIconClickedResponse, GetValidationResponse, Quit, NoDecisionCouldBeMade
    getNextRequest(newClick: string): string{
        let result: string='';

        //We are in the main menu and by reference is clicked or redirected to by reference => nextHttpRequest (Initialization)
        if(newClick === 'ByReference'){
            result = 'ByReference';
        }
        //We are in the list of icons and the next step will be a reaction to an icon click 
        else if (newClick === 'OneIconClicked'){
            result = 'OneIconClicked';
        } 
        //We are in the Configurator and A_GOSELPANEL is done
        else if (newClick === 'A_GOSELPANEL_DONE'){
            result = 'A_GOSELPANEL_DONE';
        } 
        //We are in the Configurator and A_GOSELPANEL is done
        else if (newClick === 'A_SELUPDERGO_DONE'){
            result = 'A_SELUPDERGO_DONE';
        } 
        //We are in the configurator and the next step is validation
        else if (newClick === 'ConfiguratorValidation'){
            result = 'ConfiguratorValidation';
        }
        //When back button is clicked
        else if(newClick === 'Back'){
            result = 'Back';
        } 
        //If we don't have any of those cases, no next http request could be made
        else{
            console.error('Impredictable case : next http request is unkonwn. The new click is '+ newClick);
            result = 'NoDecisionCouldBeMade';
        } 
        return result;
    } 










    <dx-tab-panel
    #tabPanel
    [height]="260"
    [dataSource]="companies"
    [selectedIndex]="0"
    [loop]="true"
    [animationEnabled]="true"
    [swipeEnabled]="true"
>
    <div *dxTemplate="let company of 'title'">
        <span>{{company.CompanyName}}</span>
    </div>
    <div *dxTemplate="let company of 'item'">
        <div class="tabpanel-item">
            <div>
                <p>
                    <b>{{company.City}}</b>
                    (<span>{{company.State}}</span>)
                </p>
                <p>
                    <span>{{company.Zipcode}}</span>
                    <span>{{company.Address}}</span>
                </p>
            </div>
            <div>
                <p>
                    Phone: <b>{{company.Phone}}</b>
                </p>
                <p>
                    Fax: <b>{{company.Fax}}</b>
                </p>
                <p>
                    Website:
                    <a href="{{company.Website}}" target="_blank">
                        {{company.Website}}
                    </a>
                </p>
            </div>
        </div>
    </div>
</dx-tab-panel>    







<!-- Progression Bar -->
        <div class="progression-container">
            <div class="btn-progression"><p>1</p></div>
            <div class="btn-progression"><p>2</p></div>
            <div class="btn-progression"><p>3</p></div>
            <div class="btn-progression"><p>4</p></div>
            <div class="btn-progression"><p>5</p></div>
            <div class="btn-progression"><p>6</p></div>
            <div class="btn-progression"><p>7</p></div>
            <div class="btn-progression"><p>8</p></div>
        </div>





    
        this.subForms.forEach((element, index) => {
            if(index===0){
              this.subformDisplay.set(element.CaptionCode, true);
            }
            else{
              this.subformDisplay.set(element.CaptionCode, false);
            }
          });
      