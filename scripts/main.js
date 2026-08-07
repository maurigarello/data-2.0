let timeElement = document.getElementById('time');
let dateElement = document.getElementById('date');
let instantValue = document.getElementById('instant-value');
let themeToggleButtons = Array.from(document.querySelectorAll('#theme-toggle, #theme-toggle-top'));
let menuToggle = document.getElementById('menu-toggle');
let sidebarMenu = document.getElementById('sidebar-menu');
let weatherTemp = document.getElementById('weather-temp');
let weatherSummary = document.getElementById('weather-summary');
let weatherDay = document.getElementById('weather-day');
let weatherHumidity = document.getElementById('weather-humidity');
let humidityForecast = document.getElementById('humidity-forecast');
let forecastList = document.getElementById('forecast-list');

let sectorChartCanvas = document.getElementById('chart-sector');
let dailyChartCanvas = document.getElementById('chart-daily');
let monthlyChartCanvas = document.getElementById('chart-monthly');
let tempChartCanvas = document.getElementById('chart-temp');
let humidityChartCanvas = document.getElementById('chart-humidity');

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
  // refresh node references in case script ran before DOM was fully ready
  themeToggleButtons = Array.from(document.querySelectorAll('#theme-toggle, #theme-toggle-top'));
  themeToggleButtons.forEach(button => {
    if (!button) return;
    const updateIcon = () => { button.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙'; };
    button.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark');
      // sync all theme buttons
      themeToggleButtons.forEach(btn => btn.textContent = isDark ? '☀️' : '🌙');
      updateIcon();
    });
    updateIcon();
  });
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
  const sectorColors = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#7c3aed', '#06b6d4'];
  // create sector doughnut with explicit colors
  const sectorChart = new Chart(sectorChartCanvas, {
    type: 'doughnut',
    data: {
      labels: sectorData.labels,
      datasets: [{
        data: sectorData.values,
        backgroundColor: sectorColors,
        borderColor: '#fff',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '55%',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              const value = context.raw;
              const total = context.chart.data.datasets[0].data.reduce((s, v) => s + v, 0);
              const pct = total ? Math.round((value / total) * 100) : 0;
              return `${context.label}: ${value} (${pct}%)`;
            }
          }
        }
      }
    }
  });
  // build interactive legend
  const legendContainer = document.getElementById('sector-legend');
  if (legendContainer) {
    const total = sectorData.values.reduce((s, v) => s + v, 0);
    legendContainer.innerHTML = sectorData.labels.map((label, i) => {
      const pct = total ? Math.round((sectorData.values[i] / total) * 100) : 0;
      return `
      <div class="legend-item" data-index="${i}" role="button" tabindex="0">
        <span class="legend-swatch" style="background:${sectorColors[i]}"></span>
        <span class="legend-label">${label}</span>
        <span class="legend-value">${pct}%</span>
      </div>
    `;
    }).join('');
    legendContainer.querySelectorAll('.legend-item').forEach((el) => {
      const idx = Number(el.getAttribute('data-index'));
      const toggle = () => {
        sectorChart.toggleDataVisibility(idx);
        sectorChart.update();
        const visible = sectorChart.getDataVisibility(idx);
        el.classList.toggle('legend-item--disabled', !visible);
      };
      el.addEventListener('click', toggle);
      el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
    });
  }
  createChart(dailyChartCanvas, 'line', dailyData.labels, dailyData.values, { scales: { y: { beginAtZero: true } } });
  createChart(monthlyChartCanvas, 'bar', monthlyData.labels, monthlyData.values, { scales: { y: { beginAtZero: true } } });
  createChart(tempChartCanvas, 'line', temperatureData.labels, temperatureData.values, { scales: { y: { beginAtZero: false } } });
  createChart(humidityChartCanvas, 'bar', humidityData.labels, humidityData.values, { scales: { y: { beginAtZero: true } } });
}

function toggleMenu() {
  menuToggle = document.getElementById('menu-toggle');
  sidebarMenu = document.getElementById('sidebar-menu');
  if (!menuToggle || !sidebarMenu) return;
  const sidebar = sidebarMenu.closest('.sidebar');
  menuToggle.addEventListener('click', () => {
    const isCollapsed = sidebar.classList.toggle('collapsed');
    sidebarMenu.classList.toggle('expanded', !isCollapsed);
    menuToggle.setAttribute('aria-expanded', String(!isCollapsed));
    menuToggle.setAttribute('aria-label', isCollapsed ? 'Expandir menú' : 'Contraer menú');
  });
}

function init() {
  // rebind DOM elements in case script ran before DOM ready
  timeElement = document.getElementById('time');
  dateElement = document.getElementById('date');
  instantValue = document.getElementById('instant-value');
  themeToggleButtons = Array.from(document.querySelectorAll('#theme-toggle, #theme-toggle-top'));
  menuToggle = document.getElementById('menu-toggle');
  sidebarMenu = document.getElementById('sidebar-menu');
  weatherTemp = document.getElementById('weather-temp');
  weatherSummary = document.getElementById('weather-summary');
  weatherDay = document.getElementById('weather-day');
  weatherHumidity = document.getElementById('weather-humidity');
  humidityForecast = document.getElementById('humidity-forecast');
  forecastList = document.getElementById('forecast-list');
  sectorChartCanvas = document.getElementById('chart-sector');
  dailyChartCanvas = document.getElementById('chart-daily');
  monthlyChartCanvas = document.getElementById('chart-monthly');
  tempChartCanvas = document.getElementById('chart-temp');
  humidityChartCanvas = document.getElementById('chart-humidity');

  updateClock();
  setInterval(updateClock, 1000);
  refreshInstantValue();
  setInterval(refreshInstantValue, 3000);

  setupThemeToggle();
  toggleMenu();
  fetchWeather();
  createCharts();
}

document.addEventListener('DOMContentLoaded', init);

// logo adjuster removed: UI caused issues for user. Function intentionally omitted.
