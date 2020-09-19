import axios from 'axios';

class ApiService {

    static apiUrl = "https://db.ygoprodeck.com/api/v7/";

    static get(token,url) {

        return axios.get(this.apiUrl + url, {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            }
        })
    }


}


export default ApiService;

