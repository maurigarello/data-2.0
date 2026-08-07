import { useEffect, useState } from 'react'

function randomInstantValue() {
  return 2300 + Math.random() * 200
}

function formatNumber(value) {
  return value.toLocaleString('es-AR', { maximumFractionDigits: 1 })
}

export function useInstantValue() {
  const [value, setValue] = useState(randomInstantValue)

  useEffect(() => {
    const id = setInterval(() => setValue(randomInstantValue()), 3000)
    return () => clearInterval(id)
  }, [])

  return `${formatNumber(value)} kW`
}
