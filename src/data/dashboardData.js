export const menuItems = [
  'Dashboard',
  'Energía',
  'Climatización',
  'UPS',
  'Generadores',
  'POP1',
  'POP2',
  'Red',
  'Alarmas',
  'Eventos',
  'Reportes',
  'Configuración',
]

export const kpis = [
  { label: 'Consumo Total', value: '1.24 MW' },
  { label: 'Consumo Hoy', value: '298 kW' },
  { label: 'Consumo Mes', value: '7.8 MW' },
  { label: 'PUE', value: '1.45' },
  { label: 'Temperatura', value: '24.8 °C' },
  { label: 'Humedad', value: '48%' },
  { label: 'UPS', value: '3 unidades' },
  { label: 'Generadores', value: '2 activos' },
  { label: 'Alarmas Activas', value: '4' },
  { label: 'Demanda Máxima', value: '1.35 MW' },
  { label: 'Factor de Potencia', value: '0.98' },
  { label: 'Estado POP1 / POP2', value: 'OK / OK' },
]

export const sectorData = {
  labels: ['TI', 'Clima', 'UPS', 'Generadores', 'POP1', 'POP2'],
  values: [28, 22, 16, 14, 12, 8],
  colors: ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#7c3aed', '#06b6d4'],
}

export const dailyData = {
  labels: Array.from({ length: 24 }, (_, index) => `${index}:00`),
  values: [12, 16, 18, 24, 28, 34, 40, 45, 50, 54, 58, 62, 66, 69, 72, 70, 66, 63, 59, 54, 48, 42, 36, 30],
}

export const monthlyData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago'],
  values: [5.2, 5.8, 6.0, 6.4, 6.8, 7.1, 7.4, 7.8],
}

export const temperatureData = {
  labels: ['Rack A', 'Rack B', 'Clima 1', 'Clima 2'],
  values: [24.8, 25.4, 23.9, 24.2],
}

export const humidityData = {
  labels: ['Rack A', 'Rack B', 'Sala 1', 'Sala 2'],
  values: [45, 48, 50, 52],
}

export const alarmCounts = [
  { key: 'critical', label: 'Críticas', value: 2 },
  { key: 'major', label: 'Mayores', value: 5 },
  { key: 'minor', label: 'Menores', value: 12 },
]

export const events = [
  { time: '09:22', name: 'Arranque generador', area: 'Generadores', priority: 'major' },
  { time: '09:08', name: 'Aumento de temperatura', area: 'Climatización', priority: 'critical' },
  { time: '08:55', name: 'UPS carga normal', area: 'UPS', priority: 'minor' },
  { time: '08:30', name: 'POP1 estable', area: 'POP1', priority: 'minor' },
  { time: '08:10', name: 'Consumo pico', area: 'Energía', priority: 'major' },
]

export const priorityLabels = {
  critical: 'Crítica',
  major: 'Mayor',
  minor: 'Menor',
}
