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
                            <button
                                type="button"
                                className="absolute top-4 right-2 bg-gray-800 hover:bg-gray-700 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 transition-colors z-50"
                                onClick={() => {
                                    open(
                                        `https://github.com/sanoojes` +
                                            import.meta.env.BASE_URL,
                                        "SingleSecondaryWindowName"
                                    );
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="2rem"
                                    height="2rem"
                                    fill="#fff"
                                >
                                    {" "}
                                    <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.6,5,2.5,9.3,6.9,10.7v-2.3c0,0-0.4,0.1-0.9,0.1c-1.4,0-2-1.2-2.1-1.9 c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1c0.4,0,0.7-0.1,0.9-0.2 c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6c0,0,1.4,0,2.8,1.3 C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3 c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v3.3c4.1-1.3,7-5.1,7-9.5C22,6.1,16.9,1.4,10.9,2.1z" />
                                </svg>
                            </button>
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

