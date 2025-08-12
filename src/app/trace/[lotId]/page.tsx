import { Metadata } from 'next'
import TraceabilityView from '@/components/TraceabilityView'
import CertificatesView from '@/components/CertificatesView'
import Link from 'next/link'

interface TracePageProps {
  params: Promise<{
    lotId: string
  }>
}

export async function generateMetadata({ params }: TracePageProps): Promise<Metadata> {
  const { lotId } = await params
  
  return {
    title: `Trazabilidad Lote #${lotId} - TARPUQKUNA`,
    description: `Sigue la trazabilidad completa del lote #${lotId} desde el campo hasta tu mesa. Sistema blockchain de transparencia agrícola.`,
    openGraph: {
      title: `Lote #${lotId} - Trazabilidad Completa`,
      description: 'Transparencia total en la cadena de suministro agrícola',
      type: 'website',
    },
  }
}

export default async function TracePage({ params }: TracePageProps) {
  const { lotId } = await params

  // Validate lotId is numeric
  const numericLotId = parseInt(lotId)
  if (isNaN(numericLotId) || numericLotId < 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-red-800 mb-4">ID de Lote Inválido</h1>
            <p className="text-red-600 mb-6">
              El ID de lote debe ser un número válido. Recibido: {lotId}
            </p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              🏠 Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header Navigation */}
      <div className="bg-white shadow-sm border-b border-green-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link 
            href="/"
            className="flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors"
          >
            <span className="text-xl">🌱</span>
            <span className="font-bold">TARPUQKUNA</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="text-green-800">
              <span className="text-sm text-green-600">Consultando lote</span>
              <div className="font-bold">#{lotId}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-green-600">
            <Link href="/" className="hover:text-green-800">Inicio</Link>
            <span>→</span>
            <span className="text-green-800 font-medium">Trazabilidad Lote #{lotId}</span>
          </nav>

          {/* Traceability Section */}
          <TraceabilityView lotId={lotId} />

          {/* Certificates Section */}
          <CertificatesView lotId={lotId} />

          {/* Blockchain Verification */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-green-200 p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6">🔗 Verificación Blockchain</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="font-bold text-green-800 mb-4">✅ Datos Verificables</h3>
                <ul className="space-y-2 text-green-700">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Origen autenticado en blockchain
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Datos IoT inmutables
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Certificaciones verificadas
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Cadena de custodia completa
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-bold text-blue-800 mb-4">🔍 Explorar en Blockchain</h3>
                <p className="text-blue-700 mb-4">
                  Todos los datos mostrados están respaldados por transacciones en la blockchain de Ethereum (Sepolia).
                </p>
                <a 
                  href={`https://sepolia.etherscan.io/address/${process.env.NEXT_PUBLIC_AGROTRACE_ADDRESS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ver Contrato ↗
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t-2 border-green-200">
              <div className="text-center text-green-600">
                <p className="text-sm">
                  🛡️ Este sistema utiliza tecnología blockchain para garantizar la 
                  <strong className="text-green-800"> inmutabilidad, transparencia y verificabilidad</strong> 
                  de todos los datos de trazabilidad.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="text-center py-8">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              🔍 Consultar Otro Lote
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}