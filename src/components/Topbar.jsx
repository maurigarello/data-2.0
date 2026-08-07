export default function Topbar({ time, date }) {
  return (
    <header className="flex w-full flex-wrap items-center justify-between gap-5">
      <p className="m-0 leading-relaxed text-slate-500 dark:text-slate-400">
        Monitorización de energía, climatización, UPS, alarmas y POP.
      </p>

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
