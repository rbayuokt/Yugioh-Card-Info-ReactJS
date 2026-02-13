import axios from 'axios';

class ApiService {

    static apiUrl = "https://db.ygoprodeck.com/api/v7/";

    static get(url: string) {

        return axios.get(this.apiUrl + url, {
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            }
        })
    }


}


export default ApiService;

