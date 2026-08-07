import heroDay from '../assets/datacenter-dia.jpg'
import heroNight from '../assets/datacenter-noche.jpg'

export default function HeroBanner({ isDark }) {
  return (
    <section
      className="relative flex min-h-[320px] w-full items-end overflow-hidden bg-cover bg-center shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
      style={{ backgroundImage: `url(${isDark ? heroNight : heroDay})` }}
    >
      <div className="absolute inset-0 bg-slate-900/45" />
      <div className="relative z-10 mx-auto w-full max-w-410 px-6 pt-24 pb-10 sm:px-10">
        <div className="max-w-160">
          <span className="mb-2 block text-[0.86rem] tracking-[0.14em] text-white uppercase">DATACENTER PACHECO</span>
          <h1 className="my-4 text-[clamp(2rem,3vw,3rem)] leading-tight text-white">Dashboard Consumo Data 2.0</h1>
          <p className="max-w-155 leading-relaxed text-white/88">
            Monitoreo en tiempo real con gráficos, clima, alarmas y estado total.
          </p>
        </div>
      </div>
    </section>
  )
}
