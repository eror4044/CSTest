import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarOwnersTableComponent } from './car-owners-table/car-owners-table.component';
import { EditFormComponent } from './edit-form/edit-form.component';

const routes: Routes = [
  {path:'',redirectTo:'/home', pathMatch: 'full'},
  {path:'home',component:CarOwnersTableComponent},
  {path:'editFrom',component:EditFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
