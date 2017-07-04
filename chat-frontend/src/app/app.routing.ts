import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from "@angular/router";

//i can't explain why in the previous project this was not necessary, and here i get a cli error
import { ModuleWithProviders } from '@angular/core';

const APP_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

export const routing = RouterModule.forRoot(APP_ROUTES);