import axios from "axios";
import { getKeyValue } from "./storage.service.js";
import { TOKEN_DICTIONARY } from "./storage.service.js";
import { printError } from "./log.services.js";

export const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case '01':
			return '☀️';
		case '02':
			return '🌤️';
		case '03':
			return '☁️';
		case '04':
			return '☁️';
		case '09':
			return '🌧️';
		case '10':
			return '🌦️';
		case '11':
			return '🌩';
		case '13':
			return '❄️';
		case '50':
			return '🌫️';
	}
};


const getLatAndLon = async (city) => {
    
    try {
        const token = await getKeyValue(TOKEN_DICTIONARY.token);
        const response = await axios.get(
            "http://api.openweathermap.org/geo/1.0/direct?",
            {
                params: {
                    q: city,
                    appid: token,
                },
            }
        );
        
        if(response.data.length){
            const latAndLon = {
                lat: response.data[0].lat,
                lon: response.data[0].lon,
                token,
            };
            return latAndLon;
        }
        return response;

    } catch (e) {
            throw new Error("Укажите токен с помощью команды -t [API_KEY]");
    }
};

export const getWeather = async (city) => {
    //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}


    try {
        const { lat, lon, token } = await getLatAndLon(city);

        const { data } = await axios.get(
            "https://api.openweathermap.org/data/2.5/weather?",
            {
                params: {
                    lat,
                    lon,
                    appid: token,
                    lang: "ua",
                    units: "metric",
                },
            }
        );

        return data;
    } catch (e) {
        if (e?.response?.status === 401) {
            printError("Неверно указан город");
        } else if (e?.response?.status === 400) {
            printError("Неверно указан токен");
        } else {
            printError(e.message);
        }
    }
};
