'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const roleOptions = [
  {
    path: '/roles/producer',
    name: 'Productor',
    emoji: '🌾',
    description: 'Registro de cultivos y producción'
  },
  {
    path: '/roles/processor',
    name: 'Procesador',
    emoji: '🏭',
    description: 'Transformación de productos'
  },
  {
    path: '/roles/transporter',
    name: 'Transportista',
    emoji: '🚛',
    description: 'Logística y transporte'
  },
  {
    path: '/roles/inspector',
    name: 'Inspector',
    emoji: '🔍',
    description: 'Control de calidad'
  },
  {
    path: '/roles/retailer',
    name: 'Minorista',
    emoji: '🏪',
    description: 'Venta al consumidor'
  }
]

export default function RolesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-2xl font-bold hover:text-green-200 transition-colors">
                🌱 TARPUQKUNA
              </Link>
              <p className="text-green-200 mt-1">Panel de Roles</p>
            </div>
            <div className="flex items-center gap-4">
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b-2 border-green-200">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex flex-wrap gap-2 py-4">
            {roleOptions.map((role) => (
              <Link
                key={role.path}
                href={role.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${pathname === role.path
                  ? 'bg-green-600 text-white'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
              >
                <span className="text-lg">{role.emoji}</span>
                <span className="font-medium">{role.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {children}
      </div>
    </div>
  )
}