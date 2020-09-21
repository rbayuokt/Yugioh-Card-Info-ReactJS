import axios from 'axios';

class ApiService {

    static apiUrl = "https://cors-anywhere.herokuapp.com/https://db.ygoprodeck.com/api/v7/";

    static get(url) {

        return axios.get(this.apiUrl + url, {
            headers: {
                "X-Requested-With": "XMLHttpRequest",
            }
        })
    }


}


export default ApiService;

