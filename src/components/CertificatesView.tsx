'use client'

import { useState, useEffect } from 'react'
import { 
  getLotCertificates, 
  formatTimestamp,
  getCertificateTypeTitle,
  CERTIFICATE_TYPES,
  type CertificateData 
} from '@/lib/web3'

interface CertificatesViewProps {
  lotId: string
}

export default function CertificatesView({ lotId }: CertificatesViewProps) {
  const [certificates, setCertificates] = useState<CertificateData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const lotIdBigInt = BigInt(lotId)
        const certs = await getLotCertificates(lotIdBigInt)
        setCertificates(certs)

      } catch (err) {
        console.error('Error fetching certificates:', err)
        setError('Error al cargar los certificados')
      } finally {
        setLoading(false)
      }
    }

    if (lotId) {
      fetchCertificates()
    }
  }, [lotId])

  const isExpired = (expiresAt: bigint): boolean => {
    const now = Math.floor(Date.now() / 1000)
    return Number(expiresAt) < now
  }

  const getCertificateIcon = (certType: string): string => {
    // Use exact hash values from CERTIFICATE_TYPES
    if (certType === CERTIFICATE_TYPES.ORGANIC) return '🌱'
    if (certType === CERTIFICATE_TYPES.FAIR_TRADE) return '🤝'
    
    // For other potential certificate types
    if (!certType) return '📜'
    const certTypeStr = certType.toLowerCase()
    if (certTypeStr.includes('rain')) return '🌳'
    if (certTypeStr.includes('carbon')) return '🌍'
    return '📜'
  }

  const getCertificateColor = (certType: string, revoked: boolean, expired: boolean): string => {
    if (revoked || expired) return 'bg-red-50 border-red-200'
    
    // Use exact hash values from CERTIFICATE_TYPES
    if (certType === CERTIFICATE_TYPES.ORGANIC) return 'bg-green-50 border-green-200'
    if (certType === CERTIFICATE_TYPES.FAIR_TRADE) return 'bg-blue-50 border-blue-200'
    
    // For other potential certificate types
    if (!certType) return 'bg-gray-50 border-gray-200'
    const certTypeStr = certType.toLowerCase()
    if (certTypeStr.includes('rain')) return 'bg-emerald-50 border-emerald-200'
    if (certTypeStr.includes('carbon')) return 'bg-purple-50 border-purple-200'
    return 'bg-gray-50 border-gray-200'
  }

  const getCertificateStatus = (cert: CertificateData): { status: string; color: string } => {
    if (cert.revoked) {
      return { status: 'REVOCADO', color: 'text-red-800 bg-red-100' }
    }
    if (isExpired(cert.expiresAt)) {
      return { status: 'EXPIRADO', color: 'text-orange-800 bg-orange-100' }
    }
    return { status: 'VÁLIDO', color: 'text-green-800 bg-green-100' }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border-2 border-green-200 p-8">
        <h2 className="text-2xl font-bold text-green-800 mb-6">🏆 Certificaciones</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-green-100 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border-2 border-green-200 p-8">
        <h2 className="text-2xl font-bold text-green-800 mb-6">🏆 Certificaciones</h2>
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-green-200 p-8">
      <h2 className="text-2xl font-bold text-green-800 mb-6">🏆 Certificaciones</h2>

      {certificates.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📜</div>
          <h3 className="text-xl font-bold text-green-800 mb-2">No hay certificaciones</h3>
          <p className="text-green-600">Este lote aún no tiene certificaciones registradas.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {certificates.map((cert, index) => {
            const { status, color } = getCertificateStatus(cert)
            const expired = isExpired(cert.expiresAt)
            
            return (
              <div 
                key={index} 
                className={`rounded-xl border-2 p-6 ${getCertificateColor(cert.certType, cert.revoked, expired)}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <span className="text-2xl">{getCertificateIcon(cert.certType)}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {getCertificateTypeTitle(cert.certType)}
                      </h3>
                      <p className="text-gray-600">
                        Emisor: {cert.issuer.slice(0, 8)}...{cert.issuer.slice(-6)}
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${color}`}>
                    {status}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Fecha de Emisión</p>
                    <p className="font-medium text-gray-800">
                      {formatTimestamp(cert.issuedAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Fecha de Expiración</p>
                    <p className={`font-medium ${expired ? 'text-red-600' : 'text-gray-800'}`}>
                      {formatTimestamp(cert.expiresAt)}
                    </p>
                  </div>
                </div>

                {/* Document Hash */}
                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-1">Hash del Documento</p>
                  <div className="bg-white rounded-lg p-3">
                    <p className="font-mono text-xs text-gray-700 break-all">
                      {cert.docHash}
                    </p>
                  </div>
                </div>

                {/* Signature */}
                {cert.sig && (
                  <div className="mb-4">
                    <p className="text-gray-600 text-sm mb-1">Firma Digital</p>
                    <div className="bg-white rounded-lg p-3">
                      <p className="font-mono text-xs text-gray-700 break-all">
                        {cert.sig}
                      </p>
                    </div>
                  </div>
                )}

                {/* Verification Status */}
                <div className="flex items-center gap-2 text-sm">
                  {cert.revoked ? (
                    <div className="flex items-center gap-2 text-red-600">
                      <span>❌</span>
                      <span>Este certificado ha sido revocado</span>
                    </div>
                  ) : expired ? (
                    <div className="flex items-center gap-2 text-orange-600">
                      <span>⏰</span>
                      <span>Este certificado ha expirado</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-green-600">
                      <span>✅</span>
                      <span>Certificado válido y verificado en blockchain</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Summary */}
      {certificates.length > 0 && (
        <div className="mt-8 pt-6 border-t-2 border-green-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-800">{certificates.length}</div>
              <div className="text-green-600 text-sm">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-800">
                {certificates.filter(c => !c.revoked && !isExpired(c.expiresAt)).length}
              </div>
              <div className="text-green-600 text-sm">Válidos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-800">
                {certificates.filter(c => isExpired(c.expiresAt)).length}
              </div>
              <div className="text-orange-600 text-sm">Expirados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-800">
                {certificates.filter(c => c.revoked).length}
              </div>
              <div className="text-red-600 text-sm">Revocados</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}