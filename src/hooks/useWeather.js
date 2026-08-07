import { useEffect, useState } from 'react'

const WEATHER_DESCRIPTIONS = {
  0: 'Despejado',
  1: 'Principalmente despejado',
  2: 'Parcialmente nublado',
  3: 'Nublado',
  45: 'Niebla',
  48: 'Neblina con escarcha',
  51: 'Llovizna ligera',
  53: 'Llovizna moderada',
  55: 'Llovizna densa',
  56: 'Llovizna helada',
  57: 'Llovizna helada densa',
  61: 'Lluvia ligera',
  63: 'Lluvia moderada',
  65: 'Lluvia intensa',
  66: 'Lluvia helada ligera',
  67: 'Lluvia helada intensa',
  71: 'Nieve ligera',
  73: 'Nieve moderada',
  75: 'Nieve intensa',
  77: 'Aguanieve',
  80: 'Chubascos ligeros',
  81: 'Chubascos moderados',
  82: 'Chubascos fuertes',
  85: 'Nieve ligera',
  86: 'Nieve intensa',
  95: 'Tormenta',
  96: 'Tormenta con granizo',
  99: 'Tormenta con granizo fuerte',
}

const WEATHER_ICONS = {
  0: '☀️',
  1: '🌤️',
  2: '⛅',
  3: '☁️',
  45: '🌫️',
  48: '🌫️',
  51: '🌧️',
  53: '🌧️',
  55: '🌧️',
  56: '🌨️',
  57: '🌨️',
  61: '🌦️',
  63: '🌧️',
  65: '⛈️',
  66: '🌨️',
  67: '🌨️',
  71: '🌨️',
  73: '🌨️',
  75: '❄️',
  77: '🌨️',
  80: '🌦️',
  81: '🌧️',
  82: '⛈️',
  85: '❄️',
  86: '❄️',
  95: '⛈️',
  96: '⛈️',
  99: '⛈️',
}

export function getWeatherDescription(code) {
  return WEATHER_DESCRIPTIONS[code] || 'Clima variable'
}

export function getWeatherIcon(code) {
  return WEATHER_ICONS[code] || '⛅'
}

const LAT = -34.455
const LON = -58.587

export function useWeather() {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchWeather() {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&timezone=America/Argentina/Buenos_Aires&daily=temperature_2m_max,temperature_2m_min,weathercode&hourly=relativehumidity_2m&current_weather=true&forecast_days=5`
        )
        const data = await response.json()
        if (!cancelled) setWeather(data)
      } catch (err) {
        if (!cancelled) setError(err)
        console.error('Weather fetch error', err)
      }
    }

    fetchWeather()
    return () => {
      cancelled = true
    }
  }, [])

  return { weather, error }
}
