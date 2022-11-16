import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormControl } from "@angular/forms";

@Component({
    selector: "login-component",
    template: `
        <label for="username">Username</label>
        <input type="text" name="username" [formControl]="username" required />
        <label for="password">Password</label>
        <input type="password" name="password" [formControl]="password"  required />
        <div>
            <button type="button" (click)="login()">Login</button>
        </div>
        `
})

export class LoginComponent implements OnInit {

    username = new FormControl('');
    password = new FormControl('');

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient
    ) {

    }

    ngOnInit(): void {
        sessionStorage.setItem('token', "");
    }

    login() {
        let url = 'http://localhost:8080/login';
        this.http.post<Observable<boolean>>(url, {
            username: this.username.value,
            password: this.password.value
        }).subscribe(authenticated => {
            if (authenticated) {
                sessionStorage.setItem('token', btoa(this.username.value + ':' + this.password.value));
                this.router.navigate(['start']);
            } else {
                alert("Authentication Failed.")
            }
        });
    }
}