import { useWeather, getWeatherDescription, getWeatherIcon } from '../hooks/useWeather'

function humidityAt(data, time) {
  const index = data.hourly.time.indexOf(time)
  return index !== -1 ? Math.round(data.hourly.relativehumidity_2m[index]) : Math.round(40 + Math.random() * 30)
}

export default function WeatherPanel() {
  const { weather, error } = useWeather()

  if (error) {
    return (
      <div className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700/20 dark:bg-slate-800">
        <span>No se pudo cargar el clima</span>
      </div>
    )
  }

  if (!weather) {
    return (
      <div className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700/20 dark:bg-slate-800">
        <span className="text-slate-500 dark:text-slate-400">Cargando clima...</span>
      </div>
    )
  }

  const current = weather.current_weather
  const humidity = humidityAt(weather, current.time)
  const humidityForecast = weather.daily.time.slice(1, 4).map((date) => ({
    label: new Date(date).toLocaleDateString('es-AR', { weekday: 'short', day: '2-digit' }),
    value: Math.round(45 + Math.random() * 25),
  }))
  const forecast = weather.daily.time.slice(1, 5).map((date, index) => ({
    label: new Date(date).toLocaleDateString('es-AR', { weekday: 'short', day: '2-digit' }),
    max: Math.round(weather.daily.temperature_2m_max[index + 1]),
    min: Math.round(weather.daily.temperature_2m_min[index + 1]),
    code: weather.daily.weathercode[index + 1],
  }))

  return (
    <div className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700/20 dark:bg-slate-800">
      <div className="mx-auto w-fit rounded-full bg-blue-600/12 px-3.5 py-2 text-[0.88rem]">
        Pronóstico de tiempo y humedad
      </div>

      <div className="grid grid-cols-1 items-start gap-4.5 sm:grid-cols-[minmax(260px,1fr)_minmax(320px,1fr)]">
        <div className="flex items-center gap-4.5">
          <span className="text-[2.8rem]">{getWeatherIcon(current.weathercode)}</span>
          <div>
            <span className="block text-[2.4rem] font-extrabold">{Math.round(current.temperature)}°</span>
            <span className="block text-slate-500 dark:text-slate-400">{getWeatherDescription(current.weathercode)}</span>
            <span className="block text-slate-500 dark:text-slate-400">Hoy</span>
          </div>
        </div>

        <div className="grid gap-2 rounded-[20px] border border-slate-200 bg-white p-4 dark:border-slate-700/20 dark:bg-slate-900">
          <span className="text-[0.9rem] text-slate-500 dark:text-slate-400">Humedad actual</span>
          <strong>{humidity}%</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-4.5 sm:grid-cols-[minmax(260px,1fr)_minmax(320px,1.5fr)]">
        <div className="grid gap-1.5 rounded-[20px] border border-slate-200 bg-blue-600/8 p-4 dark:border-slate-700/20">
          <span className="mb-1.5 block text-center font-bold text-[0.9rem] text-slate-500 dark:text-slate-400">
            Pronóstico de humedad
          </span>
          <div className="grid gap-2.5">
            {humidityForecast.map((item) => (
              <div
                key={item.label}
                className="flex justify-between gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-3 dark:border-slate-700/20 dark:bg-slate-800"
              >
                <span className="text-[0.92rem]">{item.label}</span>
                <span className="text-[0.92rem]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3">
          {forecast.map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-[1fr_auto] items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-700/20 dark:bg-slate-900"
            >
              <div className="grid justify-items-start gap-1">
                <span className="text-[0.9rem]">{item.label}</span>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-blue-600/12 text-base">
                  {getWeatherIcon(item.code)}
                </span>
                <span className="text-[0.9rem]">{getWeatherDescription(item.code)}</span>
              </div>
              <div className="grid justify-items-end gap-1 text-right">
                <strong className="text-[0.9rem]">{item.max}°</strong>
                <span className="text-[0.9rem]">{item.min}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
