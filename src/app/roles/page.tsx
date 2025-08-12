'use client'

import Link from 'next/link'

const roleOptions = [
  {
    path: '/roles/producer',
    name: 'Productor',
    emoji: '🌾',
    description: 'Registro de cultivos, siembra, cosecha y datos IoT de sensores en campo',
    features: ['Registro de lotes', 'Datos de sensores', 'Certificaciones']
  },
  {
    path: '/roles/processor',
    name: 'Procesador',
    emoji: '🏭',
    description: 'Transformación de materias primas en productos procesados',
    features: ['Control de calidad', 'Registro de procesos', 'Trazabilidad']
  },
  {
    path: '/roles/transporter',
    name: 'Transportista',
    emoji: '🚛',
    description: 'Logística, transporte y seguimiento de envíos',
    features: ['Rutas de transporte', 'Condiciones de envío', 'Entregas']
  },
  {
    path: '/roles/inspector',
    name: 'Inspector',
    emoji: '🔍',
    description: 'Control de calidad, inspecciones y verificación de cumplimiento',
    features: ['Inspecciones', 'Reportes de calidad', 'Certificaciones']
  },
  {
    path: '/roles/retailer',
    name: 'Minorista',
    emoji: '🏪',
    description: 'Venta al consumidor final y gestión de inventario',
    features: ['Gestión de inventario', 'Ventas', 'Trazabilidad al cliente']
  }
]

export default function RolesPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          👥 Panel de Roles
        </h1>
        <p className="text-xl text-green-600 max-w-3xl mx-auto">
          Selecciona tu rol en la cadena de suministro para acceder a las herramientas 
          específicas de trazabilidad y gestión
        </p>
      </div>

      {/* Role Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roleOptions.map((role) => (
          <Link
            key={role.path}
            href={role.path}
            className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200 hover:border-green-400 hover:shadow-xl transition-all group"
          >
            <div className="text-center mb-4">
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                {role.emoji}
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-2">
                {role.name}
              </h3>
              <p className="text-green-600 text-sm">
                {role.description}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-green-700 text-sm">Funciones:</h4>
              <ul className="space-y-1">
                {role.features.map((feature, index) => (
                  <li key={index} className="text-green-600 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 pt-4 border-t border-green-200">
              <span className="text-green-600 text-sm font-medium group-hover:text-green-800 transition-colors">
                Acceder →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Info Section */}
      <div className="mt-16 bg-green-50 rounded-xl p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            🔐 Sistema de Trazabilidad Descentralizado
          </h2>
          <p className="text-green-600 max-w-4xl mx-auto">
            Cada rol tiene acceso a funciones específicas que permiten registrar, 
            verificar y consultar información en la blockchain. Los datos son inmutables 
            y transparentes, garantizando la integridad de toda la cadena de suministro.
          </p>
        </div>
      </div>
    </div>
  )
}