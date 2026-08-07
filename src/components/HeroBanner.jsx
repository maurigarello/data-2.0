import heroDay from '../assets/datacenter-dia.jpg'
import heroNight from '../assets/datacenter-noche.jpg'

export default function HeroBanner({ isDark }) {
  return (
    <section
      className="relative grid w-full min-h-65 items-center overflow-hidden rounded-[28px] bg-cover bg-center shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
      style={{ backgroundImage: `url(${isDark ? heroNight : heroDay})` }}
    >
      <div className="absolute inset-0 bg-slate-900/45" />
      <div className="relative z-10 max-w-160 p-7">
        <span className="mb-2 block text-[0.86rem] tracking-[0.14em] text-white uppercase">DATACENTER PACHECO</span>
        <h1 className="my-4 text-[clamp(2rem,3vw,3rem)] leading-tight text-white">Dashboard Consumo Data 2.0</h1>
        <p className="max-w-155 leading-relaxed text-white/88">
          Monitoreo en tiempo real con gráficos, clima, alarmas y estado total.
        </p>
      </div>
    </section>
  )
}
