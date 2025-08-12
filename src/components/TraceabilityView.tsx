'use client'

import { FarmData } from '@/types'
import { formatGeohash } from '@/utils/helpers'
import { farmNFTContract, certificatesContract, CERTIFICATE_TYPES } from '@/utils/constants'
import Image from 'next/image'

interface LotMetadata {
  name: string
  description: string
  image: string
  attributes: Array<{
    trait_type: string
    value: string
  }>
}

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
  lotMeta: {
    id: bigint
    harvestId: string
    product: string
    variety: string
    owner: string
    amount: number
    tokenURI: string
    exists: boolean
    metadata: LotMetadata | null
  }
  certificates: Array<{
    certType: string
    certKey: string
    issuer: string
    transactionHash: string
    blockNumber: bigint
  }>
}

export default function TraceabilityView({ lotId, farmData, harvestData, lotData, lotMeta, certificates }: TraceabilityViewProps) {
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
          <Image
            src={farmData.photoURI}
            alt={farmData.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
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
                <span className="font-semibold">Cantidad:</span> {lotMeta.amount.toString() || lotData.amount.toString()} kg
              </p>
              <p className="text-amber-700 mb-2">
                <span className="font-semibold">Variedad:</span> {lotMeta.variety}
              </p>
              <p className="text-amber-700 mb-2">
                <span className="font-semibold">Propietario:</span>
              </p>
              <p className="text-amber-600 text-sm font-mono">
                {truncateAddress(lotMeta.owner || lotData.owner)}
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

          {/* Lot NFT Metadata */}
          {lotMeta.metadata && (
            <div className="mt-6 bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                🎯 Metadata del Lote NFT
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-blue-700 mb-2">{lotMeta.metadata.name}</h5>
                  <p className="text-blue-600 text-sm mb-4">{lotMeta.metadata.description}</p>

                  {lotMeta.metadata.attributes && lotMeta.metadata.attributes.length > 0 && (
                    <div>
                      <h6 className="font-semibold text-blue-700 mb-2">Atributos:</h6>
                      <div className="space-y-2">
                        {lotMeta.metadata.attributes.map((attr, index) => (
                          <div key={index} className="bg-white p-2 rounded border border-blue-200">
                            <span className="text-blue-600 text-sm font-medium">{attr.trait_type}:</span>
                            <span className="text-blue-800 text-sm ml-2">{attr.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {lotMeta.metadata.image && (
                  <div>
                    <h6 className="font-semibold text-blue-700 mb-2">Imagen del Producto:</h6>
                    <div className="relative h-48 rounded-lg overflow-hidden border border-blue-200 bg-gray-100">
                      <Image
                        src={lotMeta.metadata.image}
                        alt={lotMeta.metadata.name || `Imagen del lote ${lotId}`}
                        fill
                        className="object-cover transition-opacity duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={false}
                        quality={85}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                        onError={(e) => {
                          const img = e.target as HTMLImageElement
                          img.style.display = 'none'
                          const parent = img.parentElement
                          if (parent) {
                            parent.innerHTML = `
                              <div class="flex items-center justify-center h-full bg-gray-200 text-gray-500">
                                <div class="text-center">
                                  <div class="text-2xl mb-2">📷</div>
                                  <div class="text-sm">No se pudo cargar la imagen</div>
                                </div>
                              </div>
                            `
                          }
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

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