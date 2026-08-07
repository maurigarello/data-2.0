import { useMemo, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { sectorData } from '../data/dashboardData'

export default function SectorChart() {
  const [hidden, setHidden] = useState(() => new Set())

  const total = useMemo(() => sectorData.values.reduce((sum, value) => sum + value, 0), [])

  const data = {
    labels: sectorData.labels,
    datasets: [
      {
        data: sectorData.values.map((value, index) => (hidden.has(index) ? 0 : value)),
        backgroundColor: sectorData.colors,
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '55%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw
            const pct = total ? Math.round((value / total) * 100) : 0
            return `${context.label}: ${value} (${pct}%)`
          },
        },
      },
    },
  }

  const toggle = (index) => {
    setHidden((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <div className="grid gap-3">
      <div className="h-[220px] max-h-[300px] w-full">
        <Doughnut data={data} options={options} />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {sectorData.labels.map((label, index) => {
          const pct = total ? Math.round((sectorData.values[index] / total) * 100) : 0
          const isHidden = hidden.has(index)
          return (
            <div
              key={label}
              role="button"
              tabIndex={0}
              onClick={() => toggle(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggle(index)
                }
              }}
              className={`inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 dark:border-slate-700/20 dark:bg-slate-900 ${
                isHidden ? 'opacity-45' : ''
              }`}
            >
              <span className="inline-block h-3.5 w-3.5 rounded-[3px]" style={{ background: sectorData.colors[index] }} />
              <span className="text-[0.95rem]">{label}</span>
              <span className="ml-2 font-bold text-slate-500 dark:text-slate-400">{pct}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
