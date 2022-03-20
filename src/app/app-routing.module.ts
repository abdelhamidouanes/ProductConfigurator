import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MultiColumnGridComponent } from './multi-column-grid/multi-column-grid.component';

const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'ngroute_dataGrid', component : MultiColumnGridComponent},
  {path : '**', redirectTo : ''}
 ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
