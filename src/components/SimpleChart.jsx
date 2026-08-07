import { Bar, Line } from 'react-chartjs-2'

export default function SimpleChart({ type, labels, values, isDark, beginAtZero = true }) {
  const ChartComponent = type === 'bar' ? Bar : Line

  const data = {
    labels,
    datasets: [
      {
        label: 'Valor',
        data: values,
        backgroundColor: type === 'bar' ? 'rgba(37, 99, 235, 0.7)' : 'rgba(37, 99, 235, 0.35)',
        borderColor: 'rgba(37, 99, 235, 0.9)',
        borderWidth: 2,
        fill: type !== 'bar',
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  }

  const tickColor = isDark ? '#cbd5e1' : '#475569'
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: tickColor }, grid: { color: 'rgba(148,163,184,0.15)' } },
      y: { ticks: { color: tickColor }, grid: { color: 'rgba(148,163,184,0.15)' }, beginAtZero },
    },
  }

  return (
    <div className="h-[220px] max-h-[300px] w-full">
      <ChartComponent data={data} options={options} />
    </div>
  )
}
