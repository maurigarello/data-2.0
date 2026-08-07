import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js'

import { useState } from 'react'

import Sidebar from './components/Sidebar'
import SidebarToggle from './components/SidebarToggle'
import HeroBanner from './components/HeroBanner'
import Topbar from './components/Topbar'
import KpiGrid from './components/KpiGrid'
import Panel from './components/Panel'
import SectorChart from './components/SectorChart'
import WeatherPanel from './components/WeatherPanel'
import InstantMeter from './components/InstantMeter'
import SimpleChart from './components/SimpleChart'
import AlarmsPanel from './components/AlarmsPanel'
import EventsTable from './components/EventsTable'

import { useClock } from './hooks/useClock'
import { useInstantValue } from './hooks/useInstantValue'
import { useTheme } from './hooks/useTheme'
import { dailyData, monthlyData, temperatureData, humidityData } from './data/dashboardData'

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, LineElement, PointElement, Tooltip)

export default function App() {
  const { isDark, toggleTheme } = useTheme()
  const { time, date } = useClock()
  const instantValue = useInstantValue()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen w-full flex-col items-center overflow-x-hidden bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <SidebarToggle isOpen={isSidebarOpen} onClick={() => setIsSidebarOpen((prev) => !prev)} />
      <Sidebar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex w-full max-w-410 flex-col items-center gap-6 p-6 pt-24">
        <HeroBanner isDark={isDark} />

        <Topbar time={time} date={date} />

        <KpiGrid />

        <section className="grid w-full grid-cols-1 items-stretch gap-5 lg:grid-cols-3 lg:grid-rows-2">
          <Panel title="Consumo por sector" className="flex flex-col items-center">
            <SectorChart />
          </Panel>

          <Panel className="flex flex-col items-center lg:col-span-2 lg:row-span-2">
            <WeatherPanel />
          </Panel>

          <Panel title="Consumo instantáneo" className="flex flex-col items-center justify-center">
            <InstantMeter value={instantValue} />
          </Panel>
        </section>

        <section className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          <Panel title="Consumo diario" className="flex flex-col items-center">
            <SimpleChart type="line" labels={dailyData.labels} values={dailyData.values} isDark={isDark} beginAtZero />
          </Panel>
          <Panel title="Consumo mensual" className="flex flex-col items-center">
            <SimpleChart type="bar" labels={monthlyData.labels} values={monthlyData.values} isDark={isDark} beginAtZero />
          </Panel>
        </section>

        <section className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          <Panel title="Temperatura por sector" className="flex flex-col items-center">
            <SimpleChart type="line" labels={temperatureData.labels} values={temperatureData.values} isDark={isDark} beginAtZero={false} />
          </Panel>
          <Panel title="Humedad" className="flex flex-col items-center">
            <SimpleChart type="bar" labels={humidityData.labels} values={humidityData.values} isDark={isDark} beginAtZero />
          </Panel>
        </section>

        <Panel title="Alarmas" className="w-full">
          <AlarmsPanel />
        </Panel>

        <Panel title="Últimos eventos" className="w-full">
          <EventsTable />
        </Panel>
      </main>
    </div>
  )
}
