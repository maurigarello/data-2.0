export default function ThemeToggle({ isDark, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Cambiar tema"
      className="fixed top-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-2xl border border-slate-200 bg-white text-xl text-slate-900 shadow-[0_8px_18px_rgba(15,23,42,0.15)] transition hover:bg-blue-600/8 active:translate-y-px active:scale-95 dark:border-slate-700/20 dark:bg-slate-900 dark:text-slate-100"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
