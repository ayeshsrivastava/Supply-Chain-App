// src/services/weatherService.js

export async function getWeatherByCity(city) {
  try {
    const query = encodeURIComponent(city)

    // 1️⃣ Geocoding
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1`
    )
    const geoData = await geoRes.json()

    // Default fallback (Delhi)
    let latitude = 28.61
    let longitude = 77.23

    if (geoData.results && geoData.results.length > 0) {
      latitude = geoData.results[0].latitude
      longitude = geoData.results[0].longitude
    } else {
      console.warn("City not found → using fallback coordinates")
    }

    // 2️⃣ Weather
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    )
    const weatherData = await weatherRes.json()

    return {
      temperature: weatherData.current_weather?.temperature ?? 28,
      wind: weatherData.current_weather?.windspeed ?? 10,
      rain: 0
    }

  } catch (err) {
    console.error("Weather API failed → fallback used", err)

    // Always return something
    return {
      temperature: 28,
      wind: 10,
      rain: 0
    }
  }
}