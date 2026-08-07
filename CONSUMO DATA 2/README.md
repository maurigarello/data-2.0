# Consumo Data 2.0

Dashboard HTML para el Datacenter Pacheco.

## Características incluidas

- Dashboard principal con sidebar y modo oscuro
- Más de 12 KPIs al estilo versión 2.0
- Gráficos interactivos con Chart.js
- Consumo instantáneo y reloj en tiempo real
- Alarmas y tabla de eventos
- Responsive para pantallas móviles y desktop

## Archivos del proyecto

- `index.html` — estructura del dashboard
- `styles/style.css` — diseño y modo oscuro
- `scripts/main.js` — lógica de reloj, gráficos y actualización de consumo
- `.gitignore` — archivos ignorados por Git

## Cómo usar

1. Abre `index.html` en tu navegador.
2. Cambia el modo oscuro usando el botón del sidebar.
3. Revisa los gráficos y el consumo simulado.

## Cambios recientes

- Sidebar fijo y responsive; menú no se superpone al hacer scroll.
- Panel de clima compactado y alineado.
- Gráfico 'Consumo por sector' con colores, leyenda interactiva y porcentajes.
- Tooltip del gráfico muestra valor y porcentaje por segmento.
- Modo nocturno y reloj en tiempo real.

## Notas de prueba

- Los porcentajes en la leyenda y tooltip se calculan a partir de `scripts/main.js` usando `sectorData.values`.
- Si el tooltip no aparece correctamente, recargar la página puede ser necesario.

¿Querés que haga un zip del proyecto o haga el primer commit por vos?

## Git

El proyecto está preparado para inicializar Git.

Para crear el repositorio local y hacer el primer commit:

```bash
git init
git add .
git commit -m "Consumo Data 2.0 - dashboard inicial"
```

Para subirlo a GitHub desde tu cuenta:

```bash
git remote add origin https://github.com/TU_USUARIO/CONSUMO-DATA.git
git branch -M main
git push -u origin main
```

> Reemplaza `TU_USUARIO` con tu usuario de GitHub.
