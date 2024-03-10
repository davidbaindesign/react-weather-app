import { ApiClass } from "./ApiClass";
import axios from "axios";

class WeatherApi extends ApiClass {
    constructor(url, key) {
        super(url, key);
    }

    //Gets the current weather for the city you type in
    getWeatherByCity = (city) => {
        return new Promise((resolve, reject) => {
            axios.get(
                `${this._apiUrl}?q=${city}&appid=${this._apiKey}`)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

export default WeatherApi;