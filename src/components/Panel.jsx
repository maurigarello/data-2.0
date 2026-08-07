export default function Panel({ title, className = '', children }) {
  return (
    <section
      className={`rounded-[20px] border border-slate-200 bg-white p-4.5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] dark:border-slate-700/20 dark:bg-slate-900 dark:shadow-[0_18px_60px_rgba(0,0,0,0.2)] ${className}`}
    >
      {title && (
        <div className="mb-4.5 flex w-full items-center justify-center">
          <h2 className="m-0 text-center text-[1.1rem]">{title}</h2>
        </div>
      )}
      <div className="w-full">{children}</div>
    </section>
  )
}
