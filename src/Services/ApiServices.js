import axios from 'axios';

class ApiService {

    static apiUrl = "https://db.ygoprodeck.com/api/v7/";

    static get(url) {

        return axios.get(this.apiUrl + url, {
            headers: {
                "Content-type": "application/json",
            }
        })
    }


}


export default ApiService;

