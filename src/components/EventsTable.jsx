import { events, priorityLabels } from '../data/dashboardData'

const TAG_COLORS = {
  critical: 'bg-red-600',
  major: 'bg-amber-500',
  minor: 'bg-blue-600',
}

export default function EventsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {['Hora', 'Evento', 'Área', 'Prioridad'].map((header) => (
              <th
                key={header}
                className="border-b border-slate-200 px-3.5 py-4 text-left text-[0.95rem] text-slate-500 dark:border-slate-700/20 dark:text-slate-400"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr
              key={`${event.time}-${event.name}`}
              className={index !== events.length - 1 ? 'border-b border-slate-200 dark:border-slate-700/20' : ''}
            >
              <td className="px-3.5 py-4">{event.time}</td>
              <td className="px-3.5 py-4">{event.name}</td>
              <td className="px-3.5 py-4">{event.area}</td>
              <td className="px-3.5 py-4">
                <span className={`inline-flex rounded-full px-3 py-1.5 text-[0.85rem] text-white ${TAG_COLORS[event.priority]}`}>
                  {priorityLabels[event.priority]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
