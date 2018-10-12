import { Routes } from "@angular/router";
import { StadisticComponent } from "../signin-signup/stadistic/stadistic.component";
import { SigninSignupComponent } from "../signin-signup/signin-signup.component";
import { DetailComponent } from "../signin-signup/detail/detail.component";

export const dashboardRoutes: Routes = [
    { path: '', component: StadisticComponent },
    { path: 'signin-signup', component: SigninSignupComponent },
    { path: 'detail', component: DetailComponent }
]