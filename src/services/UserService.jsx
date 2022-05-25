export class UserService {
    url = "https://localhost:7194/api/";

    async GetUserByEmail(email) {
        try {
            const response = await fetch(`${this.url}User/ByEmail?email=${email}`, {method: 'GET',});
            return await response.json();
        } catch (e) {
            console.log(e);
        }
    }
}