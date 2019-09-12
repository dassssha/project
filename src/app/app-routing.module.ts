import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AddComponent } from './add/add.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path:"",component:MainComponent},
  {path:"add",component:AddComponent},
  {path:"contact/:id",component:ContactComponent},
  {path:"**",redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
