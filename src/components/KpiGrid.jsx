import { kpis } from '../data/dashboardData'

export default function KpiGrid() {
  return (
    <section className="grid w-full grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-5">
      {kpis.map((kpi) => (
        <article
          key={kpi.label}
          className="grid gap-2 rounded-[20px] border border-slate-200 bg-white p-4.5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] dark:border-slate-700/20 dark:bg-slate-900 dark:shadow-[0_18px_60px_rgba(0,0,0,0.2)]"
        >
          <span className="text-slate-500 dark:text-slate-400">{kpi.label}</span>
          <strong className="text-2xl">{kpi.value}</strong>
        </article>
      ))}
    </section>
  )
}
