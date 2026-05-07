import type { Weather } from "../interfaces/weather.interface";
import type { OpenWeather } from "../interfaces/openWeather.interface";

/**
 * Clase encargada de transformar los datos obtenidos
 * desde la API de OpenWeather al modelo interno `Weather`.
 */
export class WeatherMapper {
    /**
     * Convierte un objeto de tipo `OpenWeather`
     * al formato interno `Weather`.
     *
     * @param {OpenWeather} openWeather
     * Datos originales recibidos desde la API de OpenWeather.
     *
     * @returns {Weather}
     * Objeto adaptado al modelo interno de la aplicación.
     */
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

