import { LotMeta, LotState } from "@/types"
import { CERTIFICATE_TYPES } from "./constants"

// Format helpers - Updated for proper data scaling
export function formatTemperature(centiDegrees: number): string {
    return `${(centiDegrees / 100).toFixed(1)}°C`
}

export function formatHumidity(deciPercent: number): string {
    return `${(deciPercent / 10).toFixed(1)}%`
}

export function formatTimestamp(timestamp: bigint | undefined): string {
    if (!timestamp) return 'Fecha no disponible'
    return new Date(Number(timestamp) * 1000).toLocaleString()
}

export function getStageTitle(stage: number): string {
    switch (stage) {
        case 0: return '🌾 Producción en Campo'
        case 1: return '🏭 Procesamiento y Empaque'
        case 2: return '🚛 Transporte'
        case 3: return '🏪 Llegada y Entrega'
        default: return `Etapa ${stage}`
    }
}

export function getCertificateTypeTitle(certType: string): string {
    if (!certType) return 'Tipo desconocido'

    // Map actual certificate types from TRAZABILIDAD.md
    const certMap: Record<string, string> = {
        [CERTIFICATE_TYPES.ORGANIC]: '🌱 Orgánico',
        [CERTIFICATE_TYPES.FAIR_TRADE]: '🤝 Comercio Justo',
        'RAINFOREST': '🌳 Rainforest Alliance',
        'CARBON': '🌍 Huella de Carbono',
    }
    return certMap[certType] || certType
}

// Geohash utilities (basic implementation - needs library for full decode)
export function formatGeohash(geohash: string): string {
    if (!geohash) return 'Ubicación no disponible'

    // Map known geohashes from TRAZABILIDAD.md
    const knownLocations: Record<string, string> = {
        '6qj47f2kj5mr': 'Cusco, Perú',
        '6p8vuy2hgw8r': 'Lima, Perú',
    }

    return knownLocations[geohash] || `Geohash: ${geohash}`
}


// Validation helpers
export function isLotActive(lotMeta: LotMeta | null): boolean {
    return lotMeta?.active === true
}

export function getCompletedStages(lotState: LotState | null): number {
    if (!lotState) return 0

    let completed = 0
    if (lotState.produccion.when > 0) completed++
    if (lotState.procesoEmpaque.when > 0) completed++
    if (lotState.transporte.when > 0) completed++
    if (lotState.delivery.arrivedAt > 0) completed++

    return completed
}

export function formatLotState(stateEnum: number): string {
    const stateNames = [
        'En Finca',
        'En Proceso',
        'En Tránsito',
        'En Aduana',
        'En Bodega',
        'Entregado',
        'Cerrado'
    ]
    return stateNames[stateEnum] || `Estado ${stateEnum}`
}