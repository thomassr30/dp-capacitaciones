import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Centro de Capacitación en Salud',
    short_name: 'Cap. Salud',
    description: 'Capacitaciones certificadas en Soporte Vital Básico, Trauma, Primeros Auxilios y Emergencias',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B1220',
    theme_color: '#0EA5E9',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
