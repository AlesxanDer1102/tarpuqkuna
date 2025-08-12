'use client'

import { FarmData } from '@/types'
import { formatGeohash } from '@/utils/helpers'
import { farmNFTContract, certificatesContract, CERTIFICATE_TYPES } from '@/utils/constants'

interface TraceabilityViewProps {
  lotId: string
  farmData: FarmData
  harvestData: {
    product: string
    startDate: bigint
    farmNftId: bigint
  }
  lotData: {
    amount: bigint
    owner: string
  }
  certificates: Array<{
    certType: string
    certKey: string
    issuer: string
    transactionHash: string
    blockNumber: bigint
  }>
}

export default function TraceabilityView({ lotId, farmData, harvestData, lotData, certificates }: TraceabilityViewProps) {
  const formatTimestamp = (timestamp: bigint) => {
    return new Date(Number(timestamp) * 1000).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getCertificateType = (certType: string) => {
    switch (certType) {
      case CERTIFICATE_TYPES.ORGANIC:
        return { name: "Orgánico", emoji: "🌿", color: "green" }
      case CERTIFICATE_TYPES.FAIR_TRADE:
        return { name: "Comercio Justo", emoji: "🤝", color: "blue" }
      default:
        return { name: "Certificado", emoji: "📜", color: "gray" }
    }
  }

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`
  }


  return (
    <div className="space-y-8">
      {/* Hero Section with Farm Image */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-green-200 overflow-hidden">
        <div className="relative h-64 md:h-80">
          <img
            src={farmData.photoURI}
            alt={farmData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <span className="text-3xl">
                  {harvestData.product === 'cafe' ? '☕' : '🌾'}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold capitalize">
                  {harvestData.product}
                </h1>
                <p className="text-lg opacity-90">Lote #{lotId}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Farm Information */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                🏡 Finca de Origen
              </h3>
              <p className="text-green-700 font-bold text-lg mb-2">{farmData.name}</p>
              <p className="text-green-600 mb-1">{farmData.region}, {farmData.countryISO}</p>
              <p className="text-green-600 text-sm mb-2">Cultivo: {farmData.cropFocus}</p>
              <p className="text-green-600 text-sm mb-2">
                📍 {formatGeohash(farmData.geohash)}
              </p>
              <div className="pt-2 border-t border-green-200">
                <a 
                  href={`https://sepolia.etherscan.io/address/${farmNFTContract.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  🔗 Ver Contrato FarmNFT ↗
                </a>
              </div>
            </div>

            {/* Lot Information */}
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <h3 className="font-bold text-amber-800 mb-4 flex items-center gap-2">
                📦 Información del Lote
              </h3>
              <p className="text-amber-700 mb-2">
                <span className="font-semibold">Cantidad:</span> {lotData.amount.toString()} kg
              </p>
              <p className="text-amber-700 mb-2">
                <span className="font-semibold">Propietario:</span>
              </p>
              <p className="text-amber-600 text-sm font-mono">
                {truncateAddress(lotData.owner)}
              </p>
            </div>

            {/* Harvest Information */}
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <h3 className="font-bold text-yellow-800 mb-4 flex items-center gap-2">
                🌱 Información de Cosecha
              </h3>
              <p className="text-yellow-700 mb-2">
                <span className="font-semibold">Inicio:</span>
              </p>
              <p className="text-yellow-600 text-sm mb-2">
                {formatTimestamp(harvestData.startDate)}
              </p>
              <p className="text-yellow-700 mb-2">
                <span className="font-semibold">Finca ID:</span> #{harvestData.farmNftId.toString()}
              </p>
              <div className="pt-2 border-t border-yellow-200">
                <a 
                  href={`https://sepolia.etherscan.io/token/${farmNFTContract.address}?a=${harvestData.farmNftId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  🔗 Ver NFT #{harvestData.farmNftId.toString()} ↗
                </a>
              </div>
            </div>
          </div>

          {/* Farm Details from Metadata */}
          {farmData.metaURI && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                ℹ️ Detalles Adicionales de la Finca
              </h4>
              <div className="text-sm text-gray-600">
                <p>Datos verificados en blockchain y metadata descentralizada</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Certificates Section */}
      {certificates.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-200 p-8">
          <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center gap-2">
            🏆 Certificaciones
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {certificates.map((cert, index) => {
              const certInfo = getCertificateType(cert.certType)
              return (
                <div key={index} className={`bg-${certInfo.color}-50 rounded-xl p-6 border-2 border-${certInfo.color}-200`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 bg-${certInfo.color}-100 rounded-full flex items-center justify-center`}>
                      <span className="text-3xl">{certInfo.emoji}</span>
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold text-${certInfo.color}-800`}>
                        {certInfo.name}
                      </h3>
                      <p className={`text-${certInfo.color}-600`}>
                        Certificado Verificado en Blockchain
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className={`bg-white p-3 rounded-lg border border-${certInfo.color}-200`}>
                      <div className={`text-${certInfo.color}-600 font-medium text-sm mb-1`}>
                        👨‍💼 Emisor del Certificado
                      </div>
                      <div className={`text-${certInfo.color}-800 font-mono text-sm`}>
                        {truncateAddress(cert.issuer)}
                      </div>
                    </div>

                    <div className={`bg-white p-3 rounded-lg border border-${certInfo.color}-200`}>
                      <div className={`text-${certInfo.color}-600 font-medium text-sm mb-1`}>
                        🔑 Clave del Certificado
                      </div>
                      <div className={`text-${certInfo.color}-800 font-mono text-xs`}>
                        {truncateHash(cert.certKey)}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex flex-col gap-2 text-xs">
                        <a 
                          href={`https://sepolia.etherscan.io/tx/${cert.transactionHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          🔗 Ver Transacción en Etherscan ↗
                        </a>
                        <a 
                          href={`https://sepolia.etherscan.io/address/${certificatesContract.address}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          📜 Ver Contrato de Certificados ↗
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}