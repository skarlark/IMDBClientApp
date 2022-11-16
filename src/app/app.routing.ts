import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from "./app.component";
import { StartComponent } from './component/home.component';
import { LoginComponent } from "./component/login.component";

const routes: Routes = [
    { path: 'start', component: StartComponent },
    { path: '', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }