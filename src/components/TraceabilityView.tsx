'use client'

import { useState, useEffect } from 'react'
import {
  getLotMeta,
  getLotStateEnum,
  getFarmData,
  getAllTraceabilityEvents,
  formatTemperature,
  formatHumidity,
  formatTimestamp,
  formatLotState,
  getStageTitle,
  formatGeohash,
  type LotMeta,
  type FarmData,
  type StageEvent,
  type RouteEvent,
  type DeliveryEvent
} from '@/lib/web3'

interface TraceabilityViewProps {
  lotId: string
}

export default function TraceabilityView({ lotId }: TraceabilityViewProps) {
  const [lotMeta, setLotMeta] = useState<LotMeta | null>(null)
  const [lotStateEnum, setLotStateEnum] = useState<number | null>(null)
  const [farmData, setFarmData] = useState<FarmData | null>(null)
  const [stageEvents, setStageEvents] = useState<StageEvent[]>([])
  const [routeEvents, setRouteEvents] = useState<RouteEvent[]>([])
  const [deliveryEvents, setDeliveryEvents] = useState<DeliveryEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTraceabilityData = async () => {
      try {
        setLoading(true)
        setError(null)

        const lotIdBigInt = BigInt(lotId)

        // Fetch lot metadata
        const meta = await getLotMeta(lotIdBigInt)
        if (!meta) {
          setError('No se encontró el lote especificado')
          return
        }
        setLotMeta(meta)

        // Fetch lot state enum
        const stateEnum = await getLotStateEnum(lotIdBigInt)
        setLotStateEnum(stateEnum)

        // Fetch farm data
        const farm = await getFarmData(meta.farmNftId)
        if (farm) {
          setFarmData(farm)
        }

        // Fetch all traceability events in one optimized call
        const events = await getAllTraceabilityEvents(lotIdBigInt)

        setStageEvents(events.stages.sort((a, b) => Number(a.time || 0) - Number(b.time || 0)))
        setRouteEvents(events.routes)
        setDeliveryEvents(events.deliveries)

      } catch (err) {
        console.error('Error fetching traceability data:', err)
        setError('Error al cargar los datos de trazabilidad')
      } finally {
        setLoading(false)
      }
    }

    if (lotId) {
      fetchTraceabilityData()
    }
  }, [lotId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-green-200 rounded mb-4"></div>
            <div className="h-64 bg-green-100 rounded mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-32 bg-green-100 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !lotMeta) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-red-800 mb-2">Error</h2>
            <p className="text-red-600">{error || 'No se pudo cargar la información del lote'}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header - Product Info */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-green-200 p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-3xl">🌾</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-green-800">
                {lotMeta.product} {lotMeta.variety}
              </h1>
              <p className="text-green-600 text-lg">Lote #{lotId}</p>
            </div>
          </div>

          {farmData && (
            <div className="grid md:grid-cols-2 gap-6 bg-green-50 rounded-xl p-6">
              <div>
                <h3 className="font-bold text-green-800 mb-2">🏡 Origen</h3>
                <p className="text-green-700"><strong>{farmData.name}</strong></p>
                <p className="text-green-600">{farmData.region}, {farmData.countryISO}</p>
                <p className="text-green-600 text-sm">Cultivo: {farmData.cropFocus}</p>
              </div>
              <div>
                <h3 className="font-bold text-green-800 mb-2">📊 Estado</h3>
                <p className="text-green-700 font-medium">
                  {lotStateEnum !== null ? formatLotState(lotStateEnum) : 'Cargando...'}
                </p>
                <p className="text-green-600 text-sm">
                  Ubicación: {formatGeohash(farmData.geohash)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-green-200 p-8">
          <h2 className="text-2xl font-bold text-green-800 mb-6">📈 Línea de Tiempo del Producto</h2>

          {stageEvents.length > 0 ? (
            <div className="space-y-8">
              {stageEvents.map((event, index) => (
                <div key={index} className="relative">
                  {/* Timeline line */}
                  {index < stageEvents.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-20 bg-green-300"></div>
                  )}

                  <div className="flex gap-6">
                    {/* Stage icon */}
                    <div className="w-16 h-16 bg-green-100 border-4 border-green-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">
                        {event.stage === 0 ? '🌾' : event.stage === 1 ? '🏭' : event.stage === 2 ? '🚛' : '🏪'}
                      </span>
                    </div>

                    {/* Stage content */}
                    <div className="flex-1">
                      <div className={`rounded-xl p-6 ${event.stage === 2 ? 'bg-blue-50' : 'bg-green-50'}`}>
                        <div className="flex justify-between items-start mb-4">
                          <h3 className={`text-xl font-bold ${event.stage === 2 ? 'text-blue-800' : 'text-green-800'}`}>
                            {getStageTitle(event.stage)}
                          </h3>
                          <div className="text-right">
                            <p className={`font-medium ${event.stage === 2 ? 'text-blue-600' : 'text-green-600'}`}>
                              {event.time ? formatTimestamp(event.time) : 'Fecha no disponible'}
                            </p>
                            <a 
                              href={`https://sepolia.etherscan.io/tx/${event.transactionHash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-sm hover:underline ${event.stage === 2 ? 'text-blue-500 hover:text-blue-700' : 'text-green-500 hover:text-green-700'}`}
                            >
                              Ver en blockchain ↗
                            </a>
                          </div>
                        </div>

                        {/* IoT Data */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-white rounded-lg p-3">
                            <p className={`text-sm ${event.stage === 2 ? 'text-blue-600' : 'text-green-600'}`}>Temperatura</p>
                            <p className={`font-bold ${event.stage === 2 ? 'text-blue-800' : 'text-green-800'}`}>
                              Prom: {formatTemperature(event.avgTemp)}
                            </p>
                            <p className={`text-sm ${event.stage === 2 ? 'text-blue-700' : 'text-green-700'}`}>
                              Última: {formatTemperature(event.lastTemp)}
                            </p>
                          </div>
                          <div className="bg-white rounded-lg p-3">
                            <p className={`text-sm ${event.stage === 2 ? 'text-blue-600' : 'text-green-600'}`}>Humedad Ambiental</p>
                            <p className={`font-bold ${event.stage === 2 ? 'text-blue-800' : 'text-green-800'}`}>
                              Prom: {formatHumidity(event.avgHum)}
                            </p>
                            <p className={`text-sm ${event.stage === 2 ? 'text-blue-700' : 'text-green-700'}`}>
                              Última: {formatHumidity(event.lastHum)}
                            </p>
                          </div>
                          {event.stage === 0 && (
                            <div className="bg-white rounded-lg p-3">
                              <p className="text-green-600 text-sm">Humedad del Suelo</p>
                              <p className="font-bold text-green-800">
                                Prom: {formatHumidity(event.avgSoil)}
                              </p>
                              <p className="text-green-700 text-sm">
                                Última: {formatHumidity(event.lastSoil)}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Content hash */}
                        <div className="bg-white rounded-lg p-3">
                          <p className={`text-sm mb-1 ${event.stage === 2 ? 'text-blue-600' : 'text-green-600'}`}>Hash de Datos de Sensores</p>
                          <p className={`font-mono text-xs break-all px-2 py-1 rounded ${event.stage === 2 ? 'text-blue-700 bg-blue-50' : 'text-green-700 bg-green-50'}`}>
                            {event.sensorRoot}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-green-800 mb-2">Buscando datos de trazabilidad...</h3>
              <p className="text-green-600">
                {lotStateEnum !== null ? 
                  `Estado del lote: ${formatLotState(lotStateEnum)}` : 
                  'Conectando con blockchain para obtener eventos...'
                }
              </p>
            </div>
          )}

          {/* Route and Delivery Info */}
          {routeEvents.length > 0 && (
            <div className="mt-8 pt-8 border-t-2 border-green-200">
              <h3 className="text-xl font-bold text-blue-800 mb-4">🚛 Información de Transporte</h3>
              {routeEvents.map((route, index) => (
                <div key={index} className="bg-blue-50 rounded-xl p-6 mb-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-blue-600 text-sm">Ruta Declarada</p>
                      <p className="text-blue-800 font-mono">
                        {formatGeohash(route.fromGeohash)} → {formatGeohash(route.toGeohash)}
                      </p>
                    </div>
                    <div>
                      <p className="text-blue-600 text-sm">Transportista</p>
                      <p className="text-blue-800 font-mono text-sm">
                        {route.carrier?.slice(0, 8)}...{route.carrier?.slice(-6)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {deliveryEvents.length > 0 && (
            <div className="mt-8 pt-8 border-t-2 border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-4">📦 Información de Entrega</h3>
              {deliveryEvents.map((delivery, index) => (
                <div key={index} className="bg-green-50 rounded-xl p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-green-600 text-sm">Destino Final</p>
                      <p className="text-green-800 font-medium">
                        {formatGeohash(delivery.destinationGeohash)}
                      </p>
                    </div>
                    <div>
                      <p className="text-green-600 text-sm">Fecha de Entrega</p>
                      <p className="text-green-800">{formatTimestamp(delivery.deliveredAt)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}