import { alarmCounts } from '../data/dashboardData'

const COLORS = {
  critical: 'bg-red-600',
  major: 'bg-amber-500',
  minor: 'bg-blue-600',
}

export default function AlarmsPanel() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {alarmCounts.map((alarm) => (
        <div key={alarm.key} className={`grid min-h-32.5 gap-2.5 rounded-[20px] p-4.5 text-white ${COLORS[alarm.key]}`}>
          <strong className="text-2xl">{alarm.value}</strong>
          <span>{alarm.label}</span>
        </div>
      ))}
    </div>
  )
}
