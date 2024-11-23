import React, { useState } from 'react';

const Posts = () => {
    const [data, setData] = useState(null);
    const [gorod, setGorod] = useState('');

    const SearchGorod = async () => {
        const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${gorod}&days=3`;  
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '9ba4fca862mshb9b777f0678dc30p179d40jsn6a6ca73e9c81',
                'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            setData(result); 
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setData(null);
        }
    };

    const getBackgroundColor = (condition) => {
        if (condition.includes('Sunny') || condition.includes('Clear')) {
            return 'bg-yellow-200'; 
        } else if (condition.includes('Cloudy') || condition.includes('Overcast')) {
            return 'bg-gray-300'; 
        } else if (condition.includes('Rain') || condition.includes('Drizzle')) {
            return 'bg-blue-200'; 
        } else {
            return 'bg-gray-300'; 
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-300 py-8">
            <div className="bg-white p-6 w-full max-w-6xl rounded-xl shadow-lg">
                <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Weather Forecast</h1>

                <div className="flex space-x-4 mb-4">
                    <input
                        onChange={(e) => setGorod(e.target.value)}
                        className="w-full p-3 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Enter city name"
                    />
                    <button
                        onClick={SearchGorod}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Search
                    </button>
                </div>

                {data ? (
                    <div className="mt-6 flex justify-between space-x-6">
                        {}
                        <div className={`flex-1 p-4 rounded-lg shadow-md ${getBackgroundColor(data.current.condition.text)}`}>
                            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Bugun</h2>
                            <div className="flex items-center space-x-4">
                                <img
                                    src={data.current.condition.icon}
                                    alt="today's weather icon"
                                    className="w-20 h-20"
                           />
                                <div className="text-white">
                                    <p className="text-4xl font-semibold">{data.current.temp_c}°C</p>
                                    <p className="text-lg">{data.current.condition.text}</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 mt-4 rounded-b-lg">
                                <p className="text-lg text-gray-700">Wind: {data.current.wind_kph} km/h</p>
                                <p className="text-lg text-gray-700">Humidity: {data.current.humidity}%</p>
                            </div>
                        </div>
                        {}
                        <div className={`flex-1 p-4 rounded-lg shadow-md ${getBackgroundColor(data.forecast.forecastday[1].day.condition.text)}`}>
                            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Ertaga</h2>
                            <div className="flex items-center space-x-4">
                                <img
                                    src={data.forecast.forecastday[1].day.condition.icon}
                                    alt="tomorrow's weather icon"
                                    className="w-20 h-20"
                                />
             <div className="text-white">
                                    <p className="text-4xl font-semibold">{data.forecast.forecastday[1].day.avgtemp_c}°C</p>
                                    <p className="text-lg">{data.forecast.forecastday[1].day.condition.text}</p>                       
            </div>
                            </div>
                            <div className="bg-white p-4 mt-4 rounded-b-lg">
                                <p className="text-lg text-gray-700">Wind: {data.forecast.forecastday[1].day.maxwind_kph} km/h</p>
                                <p className="text-lg text-gray-700">Humidity: {data.forecast.forecastday[1].day.avghumidity}%</p>
                            </div>
                        </div>

                        {}
                        <div className={`flex-1 p-4 rounded-lg shadow-md ${getBackgroundColor(data.forecast.forecastday[2].day.condition.text)}`}>
                            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Inninga</h2>
                            <div className="flex items-center space-x-4">
                                <img
                                    src={data.forecast.forecastday[2].day.condition.icon}
                                    alt="day after tomorrow's weather icon"
                                    className="w-20 h-20"
                                />
                                <div className="text-white">
                                    <p className="text-4xl font-semibold">{data.forecast.forecastday[2].day.avgtemp_c}°C</p>
                                    <p className="text-lg">{data.forecast.forecastday[2].day.condition.text}</p>
                                </div>
                            </div>
                            <div className="bg-white p-4 mt-4 rounded-b-lg">
                                <p className="text-lg text-gray-700">Wind: {data.forecast.forecastday[2].day.maxwind_kph} km/h</p>
                                <p className="text-lg text-gray-700">Humidity: {data.forecast.forecastday[2].day.avghumidity}%</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="mt-4 text-center text-gray-600">Enter a city and click "Search" to view weather information.</p>
                )}
 </div>
        </div>
    );
};

export default Posts;
