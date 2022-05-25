import {UserService} from "./UserService";

export class AuthenticationService {
    url = "https://localhost:7194/api/Authentication/";

    logIn = (credentials) => {
        const postOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({
                "email": credentials.email,
                "password": credentials.password,
            }),
        };

        return fetch(`${this.url}logIn`, postOptions);
    }

    signUp = (user) => {
        const postOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({
                "name": user.name,
                "email": user.email,
                "password": user.password,
                "role": {
                    "id": 1,
                    "name": "",
                },
            }),
        };

        return fetch(`${this.url}signUp`, postOptions);
    }

    logOut = () => {
        const postOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
            body: JSON.stringify({}),
        };

         return  fetch(`${this.url}logOut`, postOptions);
    };

}