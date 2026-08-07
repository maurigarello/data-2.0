export default function InstantMeter({ value }) {
  return (
    <div className="grid items-center justify-items-center gap-2.5 py-6">
      <span className="text-[2.6rem] font-extrabold text-blue-700 dark:text-blue-400">{value}</span>
      <p className="m-0 text-slate-500 dark:text-slate-400">Consumo simulado en tiempo real</p>
    </div>
  )
}
