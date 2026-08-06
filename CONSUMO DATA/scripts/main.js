const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const instantValue = document.getElementById('instant-value');
const themeToggleButtons = Array.from(document.querySelectorAll('#theme-toggle, #theme-toggle-top'));
const menuToggle = document.getElementById('menu-toggle');
const sidebarMenu = document.getElementById('sidebar-menu');
const weatherTemp = document.getElementById('weather-temp');
const weatherSummary = document.getElementById('weather-summary');
const weatherDay = document.getElementById('weather-day');
const weatherHumidity = document.getElementById('weather-humidity');
const humidityForecast = document.getElementById('humidity-forecast');
const forecastList = document.getElementById('forecast-list');

const sectorChartCanvas = document.getElementById('chart-sector');
const dailyChartCanvas = document.getElementById('chart-daily');
const monthlyChartCanvas = document.getElementById('chart-monthly');
const tempChartCanvas = document.getElementById('chart-temp');
const humidityChartCanvas = document.getElementById('chart-humidity');

const sectorData = {
  labels: ['TI', 'Clima', 'UPS', 'Generadores', 'POP1', 'POP2'],
  values: [28, 22, 16, 14, 12, 8]
};

const dailyData = {
  labels: Array.from({ length: 24 }, (_, index) => `${index}:00`),
  values: [12, 16, 18, 24, 28, 34, 40, 45, 50, 54, 58, 62, 66, 69, 72, 70, 66, 63, 59, 54, 48, 42, 36, 30]
};

const monthlyData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
  values: [5.2, 5.8, 6.0, 6.4, 6.8, 7.1, 7.4, 7.8]
};

const temperatureData = {
  labels: ['Rack A', 'Rack B', 'Clima 1', 'Clima 2'],
  values: [24.8, 25.4, 23.9, 24.2]
};

const humidityData = {
  labels: ['Rack A', 'Rack B', 'Sala 1', 'Sala 2'],
  values: [45, 48, 50, 52]
};

function formatNumber(value) {
  return value.toLocaleString('es-AR', { maximumFractionDigits: 1 });
}

function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('es-AR', { hour12: false });
  const dateString = now.toLocaleDateString('es-AR', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' });

  timeElement.textContent = timeString;
  dateElement.textContent = dateString;
}

function createChart(element, type, labels, values, options = {}) {
  return new Chart(element, {
    type,
    data: {
      labels,
      datasets: [{
        label: 'Valor',
        data: values,
        backgroundColor: type === 'bar' ? 'rgba(37, 99, 235, 0.7)' : 'rgba(37, 99, 235, 0.35)',
        borderColor: 'rgba(37, 99, 235, 0.9)',
        borderWidth: 2,
        fill: type !== 'bar',
        tension: 0.4,
        pointRadius: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { color: document.body.classList.contains('dark') ? '#cbd5e1' : '#475569' }, grid: { color: 'rgba(148,163,184,0.15)' } },
        y: { ticks: { color: document.body.classList.contains('dark') ? '#cbd5e1' : '#475569' }, grid: { color: 'rgba(148,163,184,0.15)' } }
      },
      ...options
    }
  });
}

function randomInstantValue() {
  return 2300 + Math.random() * 200;
}

function refreshInstantValue() {
  const value = randomInstantValue();
  instantValue.textContent = `${formatNumber(value)} kW`;
}

function setupThemeToggle() {
  themeToggleButtons.forEach(button => {
    if (!button) return;
    button.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark');
      const icon = isDark ? '☀️' : '🌙';
      themeToggleButtons.forEach(btn => {
        if (btn) btn.textContent = icon;
      });
    });
  });
}

function toggleMenu() {
  if (!menuToggle || !sidebarMenu) return;
  const sidebar = sidebarMenu.closest('.sidebar');
  menuToggle.addEventListener('click', () => {
    const isCollapsed = sidebar.classList.toggle('collapsed');
    sidebarMenu.classList.toggle('expanded', !isCollapsed);
    menuToggle.setAttribute('aria-expanded', String(!isCollapsed));
    menuToggle.setAttribute('aria-label', isCollapsed ? 'Expandir menú' : 'Contraer menú');
  });
}

function getWeatherDescription(code) {
  const map = {
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
    99: 'Tormenta con granizo fuerte'
  };
  return map[code] || 'Clima variable';
}

function getWeatherIcon(code) {
  const iconMap = {
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
    99: '⛈️'
  };
  return iconMap[code] || '⛅';
}

function renderWeather(data) {
  if (!data) return;
  const current = data.current_weather;
  weatherTemp.textContent = `${Math.round(current.temperature)}°`;
  weatherSummary.textContent = getWeatherDescription(current.weathercode);
  weatherDay.textContent = 'Hoy';
  const currentTime = current.time;
  const humidityIndex = data.hourly.time.indexOf(currentTime);
  const humidityValue = humidityIndex !== -1 ? data.hourly.relativehumidity_2m[humidityIndex] : Math.round(40 + Math.random() * 30);
  weatherHumidity.textContent = `${Math.round(humidityValue)}%`;
  document.getElementById('weather-icon').textContent = getWeatherIcon(current.weathercode);

  humidityForecast.innerHTML = data.daily.time.slice(1, 4).map((date, index) => {
    const humidity = Math.round(45 + Math.random() * 25);
    const dayLabel = new Date(date).toLocaleDateString('es-AR', { weekday: 'short', day: '2-digit' });
    return `
      <div class="humidity-forecast-item">
        <span>${dayLabel}</span>
        <span>${humidity}%</span>
      </div>
    `;
  }).join('');

  forecastList.innerHTML = data.daily.time.slice(1, 5).map((date, index) => {
    const max = Math.round(data.daily.temperature_2m_max[index + 1]);
    const min = Math.round(data.daily.temperature_2m_min[index + 1]);
    const code = data.daily.weathercode[index + 1];
    const dateLabel = new Date(date).toLocaleDateString('es-AR', { weekday: 'short', day: '2-digit' });

    return `
      <div class="weather-day-card">
        <div class="weather-day-info">
          <span>${dateLabel}</span>
          <span class="weather-icon-small">${getWeatherIcon(code)}</span>
          <span>${getWeatherDescription(code)}</span>
        </div>
        <div>
          <strong>${max}°</strong>
          <span>${min}°</span>
        </div>
      </div>
    `;
  }).join('');
}

async function fetchWeather() {
  try {
    const lat = -34.455;
    const lon = -58.587;
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=America/Argentina/Buenos_Aires&daily=temperature_2m_max,temperature_2m_min,weathercode&hourly=relativehumidity_2m&current_weather=true&forecast_days=5`
    );
    const data = await response.json();
    renderWeather(data);
  } catch (error) {
    weatherSummary.textContent = 'No se pudo cargar el clima';
    forecastList.innerHTML = '';
    console.error('Weather fetch error', error);
  }
}

function createCharts() {
  createChart(sectorChartCanvas, 'doughnut', sectorData.labels, sectorData.values, { cutout: '55%' });
  createChart(dailyChartCanvas, 'line', dailyData.labels, dailyData.values, { scales: { y: { beginAtZero: true } } });
  createChart(monthlyChartCanvas, 'bar', monthlyData.labels, monthlyData.values, { scales: { y: { beginAtZero: true } } });
  createChart(tempChartCanvas, 'line', temperatureData.labels, temperatureData.values, { scales: { y: { beginAtZero: false } } });
  createChart(humidityChartCanvas, 'bar', humidityData.labels, humidityData.values, { scales: { y: { beginAtZero: true } } });
}

updateClock();
setInterval(updateClock, 1000);
refreshInstantValue();
setInterval(refreshInstantValue, 3000);
setupThemeToggle();
toggleMenu();
fetchWeather();
createCharts();
