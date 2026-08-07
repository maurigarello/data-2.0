# Consumo Data 2.0

SPA (Single Page Application) del dashboard de monitoreo para el Datacenter Pacheco, construida con **React**, **Vite** y **Tailwind CSS**.

## Características

- Dashboard con sidebar colapsable y modo oscuro (clase `dark` en `<html>`)
- Más de 12 KPIs
- Gráficos interactivos con Chart.js (`react-chartjs-2`): consumo por sector, diario, mensual, temperatura y humedad
- Panel de clima en vivo (Open-Meteo API) con pronóstico de 4 días
- Consumo instantáneo simulado y reloj en tiempo real
- Alarmas y tabla de últimos eventos
- Responsive para pantallas móviles y desktop

## Estructura del proyecto

- `index.html` — punto de entrada de Vite
- `src/main.jsx` — bootstrap de React
- `src/App.jsx` — layout principal y composición de paneles
- `src/components/` — componentes de UI (Sidebar, Topbar, HeroBanner, KpiGrid, Panel, SimpleChart, SectorChart, WeatherPanel, InstantMeter, AlarmsPanel, EventsTable)
- `src/hooks/` — lógica de estado (`useClock`, `useInstantValue`, `useTheme`, `useWeather`)
- `src/data/dashboardData.js` — datos del dashboard (KPIs, series de gráficos, eventos, alarmas)
- `src/assets/` — imágenes (logo, fotos del datacenter día/noche)

## Cómo usar

```bash
npm install
npm run dev
```

Abre la URL que indique Vite (por defecto `http://localhost:5173`).

Para generar el build de producción:

```bash
npm run build
npm run preview
```

## Notas

- El panel de clima consume la API pública de [Open-Meteo](https://open-meteo.com/) para las coordenadas del Datacenter Pacheco.
- El modo oscuro se controla con Tailwind (`@custom-variant dark`) alternando la clase `dark` en el elemento raíz.
