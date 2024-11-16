const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;


// Your OpenWeatherMap API key
const WEATHER_API_KEY = 'f40f159dfc014fce7c63f6dbdb752e0f';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

app.get('/weather', async (req, res) => {
    const { city } = req.query;
    
    if (!city) {
        return res.status(400).json({ error: 'Please provide a city' });
    }

    try {
        const response = await axios.get(WEATHER_API_URL, {
            params: {
                q: city, 
                appid: WEATHER_API_KEY, 
                units: 'metric'
            }
        });

        res.json({
            city: response.data.name,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
        });
    } catch (error) {
        console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Could not fetch weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Weather API is running at http://localhost:${PORT}`);
});