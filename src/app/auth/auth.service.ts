import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    token: string;
    incorrect: boolean;

    constructor(private router: Router) {}

    signinUser(email: string, password: string) {

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    this.router.navigate(['general']);
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => this.token = token
                        );
                    if (this.isAdmin()) {
                        this.router.navigate(['admin']);
                    } else {
                        this.router.navigate(['general']);
                    }
                }
            )
            .catch(
                error => {
                    console.log(error);
                    this.incorrect = true;
                }
            );
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => this.token = token
            );
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    isAdmin() {
        return firebase.auth().currentUser.email === 'admin@mail.ru';
    }
}
