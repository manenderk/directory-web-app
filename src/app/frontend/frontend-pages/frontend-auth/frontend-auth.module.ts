import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StageSocialRedirectComponent } from './stage-social-redirect/stage-social-redirect.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'stage-social-redirect',
    component: StageSocialRedirectComponent
  }
];

@NgModule({
  declarations: [LoginComponent, StageSocialRedirectComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FrontendAuthModule { }
