import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './auth/signin/signin.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
    { path: 'signin', component: SigninComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        loadChildren: './income-egress/income-egress.module#IncomeEgressModule',
        canLoad: [AuthGuardService]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
