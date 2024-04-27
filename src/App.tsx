import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Card from "./components/Card";
import { WeatherProps } from "./lib/types";

function App() {
    const [city, setCity] = useState<string>("Kerala");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [weather, setWeather] = useState<WeatherProps>();
    const [error, setError] = useState<string>("");

    async function fetchWeather() {
        if (!city.trim()) return;
        setIsLoading(true);
        setError("");
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=d42efdafd1eb22088a6c051ab1b5fdfb&q=${city}`
            );
            const data = await res.json();
            if (res.ok) {
                setWeather(data);
            } else {
                throw new Error(data.message || "Failed to fetch weather data");
            }
        } catch (error) {
            setError(String(error));
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchWeather();
    }, []);

    const city_name = weather?.name ?? "N/A";
    const temperature = weather?.main.temp ?? "N/A";
    const humidity = weather?.main.humidity ?? "N/A";
    const windSpeed = weather?.wind.speed ?? "N/A";

    return (
        <>
            <main className="flex justify-center items-center bg-neutral-950 h-screen w-screen">
                <div className="flex flex-col space-y-4 justify-between w-9/12 h-fit max-w-screen-md bg-gradient-to-tl from-violet-700 to-pink-800 rounded-2xl px-4 py-2">
                    <div className="flex justify-center items-center w-full gap-2 bg-neutral-50 bg-opacity-40 px-2 py-4 border-4 border-neutral-50 border-opacity-10 shadow-sm rounded-2xl">
                        <input
                            type="text"
                            className="h-14 w-full bg-neutral-50 bg-opacity-70 border-neutral-50 border-opacity-10 hover:bg-neutral-100 rounded-full border-2 px-4 focus:outline-none hover:bg-opacity-90 transition-colors"
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter Your City Name"
                        />
                        <Button handleClick={() => fetchWeather()} />
                    </div>
                    {error ? (
                        <div className="flex flex-col justify-center items-center w-full gap-2 bg-neutral-50 bg-opacity-40 px-2 py-8 border-4 border-neutral-50 border-opacity-10 shadow-sm rounded-2xl h-full">
                            <h1>{error}</h1>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col justify-center items-center w-full gap-2 bg-neutral-50 bg-opacity-40 px-2 py-8 border-4 border-neutral-50 border-opacity-10 shadow-sm rounded-2xl h-full">
                                <img
                                    src="images/clouds.png"
                                    alt=""
                                    className="h-40"
                                />
                                <h1 className="text-7xl font-bold text-neutral-950">
                                    {isLoading
                                        ? "Loading..."
                                        : `${Math.round(
                                              Number(
                                                  temperature === "N/A"
                                                      ? "N/A"
                                                      : temperature
                                              )
                                          )} °C`}
                                </h1>
                                <h2 className="text-4xl text-neutral-950 tracking-wide">
                                    {isLoading
                                        ? "Loading..."
                                        : city_name || "N/A"}
                                </h2>
                            </div>
                            <div className="flex gap-2">
                                <Card
                                    mainTxt={
                                        isLoading
                                            ? "Loading..."
                                            : `${humidity} %`
                                    }
                                    desc="Humidity"
                                    imgAlt="humidity logo"
                                    pathToImg="images/humidity.png"
                                />
                                <Card
                                    mainTxt={
                                        isLoading
                                            ? "Loading..."
                                            : `${windSpeed} km/h`
                                    }
                                    desc="Wind Speed"
                                    imgAlt="wind logo"
                                    pathToImg="images/wind.png"
                                />
                            </div>
                        </>
                    )}
                </div>
            </main>
        </>
    );
}

export default App;

