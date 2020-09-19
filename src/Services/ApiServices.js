import axios from 'axios';

class ApiService {

    static apiUrl = "https://db.ygoprodeck.com/api/v7/";

    static post(token, url, payload) {

        return axios.post(this.apiUrl + url, payload, {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
            params: {
                "timestamp": new Date().getTime()
            }
        })
            .then(res => {
                return res.data
            }).catch(err => {

                throw err;
            });

    }

    static get(url) {

        return axios.get(this.apiUrl + url, {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            },
        })
    }

    static patch(token, url,payload) {

        return axios.patch(this.apiUrl + url, payload, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
                "Content-type": "application/json",
            },
            params: {
                "timestamp": new Date().getTime()
            }
        })
            .then(res => {
                return res.data
            }).catch(err => {

                throw err;
            });
    }

    static delete(token, url) {

        return axios.delete(this.apiUrl + url, {
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
                "Content-type": "application/json",
            },
            params: {
                "timestamp": new Date().getTime()
            }
        })
    }


    static getProfile(token) {
        return ApiService.get(token, "/api/me")
    }

}


export default ApiService;

