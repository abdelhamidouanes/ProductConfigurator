import { FilterSearchService } from './Services/filtersSearch.service';
import { LoadingService } from './Services/loading.service';
import { FooterService } from './Services/footer.service';
import { PopUpService } from './Services/popUp.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ArticleComponent } from './article/article.component';
import { ConfiguratorComponent } from './configurator/configurator.component';

import { RetreiveHttpDataService } from './Services/retreiveHttpData.service';
import { NavigationStepsService } from './Services/navigationSteps.service';
import { RoutingService } from './Services/routingService.service';
import { ConfiguratorDisplayService } from './Services/configuratorDisplay.service';
import { MenuComponent } from './menu/menu.component';
import { BrandsComponent } from './brands/brands.component';
import { RecapComponent } from './recap/recap.component';
import { OutletContainerComponent } from './outlet-container/outlet-container.component';
import { HeaderService } from './Services/header.service';
import { MultiCriteriaSearchComponent } from './multi-criteria-search/multi-criteria-search.component';
import { IconsComponent } from './icons/icons.component';
import { DxSliderModule, DxNumberBoxModule, DxDataGridModule, DxCheckBoxModule, DxSelectBoxModule, DxTooltipModule, DxTemplateModule, DxListModule, DxTextBoxModule, DxMenuModule, DxTabPanelModule, DxLoadPanelModule } from 'devextreme-angular';
import { DataListComponent } from './data-list/data-list.component';
import { FormsModule} from '@angular/forms';
import { IframeComponent } from './iframe/iframe.component';
import { AlertMsgComponent } from './alert-msg/alert-msg.component';
import { LoginComponent } from './login/login.component';
import { ListCatalogComponent } from './list-catalog/list-catalog.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { PopupContainerComponent } from './popup-container/popup-container.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { MovableWindowComponent } from './movable-window/movable-window.component';
import { PartsPopUpComponent } from './parts-pop-up/parts-pop-up.component';
import { MultiColumnGridComponent } from './multi-column-grid/multi-column-grid.component';
import { APP_BASE_HREF } from '@angular/common';
import { getBaseLocation } from './Shared/common-functions.util';
import { WarningMsgComponent } from './warning-msg/warning-msg.component';
import { OneFormConfiguratorComponent } from './one-form-configurator/one-form-configurator.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NavigationComponent,
    ArticleComponent,
    ConfiguratorComponent,
    MenuComponent,
    BrandsComponent,
    RecapComponent,
    OutletContainerComponent,
    MultiCriteriaSearchComponent,
    IconsComponent,
    DataListComponent,
    IframeComponent,
    AlertMsgComponent,
    LoginComponent,
    ListCatalogComponent,
    TopBarComponent,
    PopupContainerComponent,
    ImageViewerComponent,
    MovableWindowComponent,
    PartsPopUpComponent,
    MultiColumnGridComponent,
    WarningMsgComponent,
    OneFormConfiguratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxCheckBoxModule,
    DxDataGridModule,
    DxTooltipModule,
    DxTemplateModule,
    FormsModule,
    DxListModule,
    DxTextBoxModule,
    DxMenuModule,
    DxSliderModule,
    DxTabPanelModule,
    DxLoadPanelModule
  ],
  providers: [RetreiveHttpDataService,
              RoutingService,
              FooterService,
              HeaderService,
              NavigationStepsService,
              FilterSearchService,
              PopUpService,
              LoadingService,
              ConfiguratorDisplayService,
              {
                  provide: APP_BASE_HREF,
                  useFactory: getBaseLocation
              }
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
