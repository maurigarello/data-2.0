export default function Topbar({ time, date }) {
  return (
    <header className="flex w-full flex-wrap items-start justify-between gap-5">
      <div>
        <p className="mb-2 text-[0.86rem] tracking-[0.14em] text-slate-500 uppercase dark:text-slate-400">DATACENTER PACHECO</p>
        <h1 className="m-0 text-[clamp(1.8rem,2.5vw,2.8rem)]">Dashboard Consumo Data 2.0</h1>
        <p className="mt-3 leading-relaxed text-slate-500 dark:text-slate-400">
          Monitorización de energía, climatización, UPS, alarmas y POP.
        </p>
      </div>

      <div className="grid justify-items-end gap-4">
        <div className="inline-flex rounded-full bg-emerald-500/12 px-3.5 py-2.5 font-semibold">
          Estado general: <strong>&nbsp;Operativo</strong>
        </div>
        <div>
          <span className="block text-2xl font-bold">{time}</span>
          <span className="block text-slate-500 dark:text-slate-400">{date}</span>
        </div>
      </div>
    </header>
  )
}
