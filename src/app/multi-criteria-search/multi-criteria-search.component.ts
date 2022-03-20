import { ParameterASELUPDERGO } from './../Models/ParameterASELUPDERGO.model';
import { SubformsAGOSELPANEL } from './../Models/SubformsAGOSELPANEL.model';
import { Image } from './../Models/Image.model';
import { Subscription } from 'rxjs';
import { ContentAGOSELPANEL } from './../Models/ContentAGOSELPANEL.model';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RetreiveHttpDataService } from '../Services/retreiveHttpData.service';
import { DatasASELUPDERGO } from '../Models/DatasASELUPDERGO.model';
import { CriteriaASELUPDERGO } from '../Models/CriteriaASELUPDERGO.model';
import DataSource from 'devextreme/data/data_source';
import { pageSizeSelectBox, thresholdSelectBox } from '../Shared/Constantes';


@Component({
  selector: 'app-multi-criteria-search',
  templateUrl: './multi-criteria-search.component.html',
  styleUrls: ['./multi-criteria-search.component.css']
})
export class MultiCriteriaSearchComponent implements OnInit, OnDestroy {

  

  constructor(private retreiveHttpDataService: RetreiveHttpDataService,) {
      
      
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }


  ngOnInit(): void { 
  }




}
