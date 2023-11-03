import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateUsersComponent } from './components/create-users/create-users.component';

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'ingresar', component: CreateUsersComponent },
  { path: 'ingresar/:id', component: CreateUsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
