import { NgModule } from '@angular/core';

// Component
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';

// Modules
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [
        SigninComponent,
        RegisterComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        AngularFireAuthModule,
        RouterModule
    ]
})
export class AuthModule { }
