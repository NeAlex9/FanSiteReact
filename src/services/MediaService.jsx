export default class MediaService {
    url = "https://localhost:7194/api/";

    async GetMedia() {
        try {
            const response = await fetch(this.url + `Media/${0}/${100}`, {
                method: 'GET',
            });
            return await response.json();
        } catch (e) {
            console.log(e);
        }
    }

    async GetMediaById(id) {
        try {
            const response = await fetch(`${this.url}Media/${id}`, {
                method: 'GET',
            })
            return await response.json();
        } catch (e) {
            console.log(e);
        }
    }
}