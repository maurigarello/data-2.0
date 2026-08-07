import logo from '../assets/personal-gif.gif'
import { menuItems } from '../data/dashboardData'

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          aria-hidden="true"
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-[1px] transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 flex h-screen w-80 flex-col items-center overflow-y-auto overflow-x-hidden border-r border-slate-200 bg-white p-5 shadow-2xl transition-transform duration-300 ease-in-out dark:border-slate-700/20 dark:bg-slate-900 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex w-full flex-col items-center gap-2 pt-2">
          <div className="flex h-20 w-full items-center justify-center overflow-hidden rounded-2xl bg-black">
            <img src={logo} alt="Personal logo" className="h-full w-full object-contain object-center" />
          </div>
          <div className="grid justify-items-center gap-0.5 text-center">
            <span className="font-bold text-blue-700 dark:text-blue-400">Datacenter Pacheco</span>
            <span className="text-[0.95rem] text-slate-500 dark:text-slate-400">Monitoreo y control</span>
          </div>
        </div>

        <nav className="mt-6 grid w-full gap-1">
          {menuItems.map((item, index) => (
            <a
              key={item}
              href="#"
              className={`block rounded-2xl px-3 py-2 text-center text-[0.95rem] leading-snug text-slate-900 transition hover:bg-blue-600/12 dark:text-slate-100 ${
                index === 0 ? 'bg-blue-600/12 font-medium' : ''
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>
    </>
  )
}
