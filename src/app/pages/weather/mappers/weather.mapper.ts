import type { Weather } from "../interfaces/weather.interface";
import type { OpenWeather } from "../interfaces/openWeather.interface";

export class WeatherMapper {
    static mapOpenWeatherToWeather(openWeather: OpenWeather): Weather {
        return {
            city: openWeather.name,
            temperature: Math.round(openWeather.main.temp),
            description: openWeather.weather[0]?.description ?? "Sin datos",
            humidity: openWeather.main.humidity,
            windSpeed: openWeather.wind.speed,
            icon: openWeather.weather[0]?.icon ?? "",
            lat: openWeather.coord.lat,
            lon: openWeather.coord.lon,
        };
    }
}

