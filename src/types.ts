
// Types based on TRAZABILIDAD.md documentation
export interface LotMeta {
    farmNftId: bigint
    harvestId: string
    product: string
    variety: string
    unit: string
    unitDecimals: number
    tokenURI: string
    active: boolean
}

export interface StageState {
    when: bigint
    dataHash: string
    avgTemp: number    // Stored as centi-degrees (divide by 100)
    lastTemp: number   // Stored as centi-degrees (divide by 100)  
    avgHumidity: number // Stored as deci-percent (divide by 100)
    lastHumidity: number // Stored as deci-percent (divide by 100)
    avgSoilMoisture: number // Stored as deci-percent (divide by 100)
    lastSoilMoisture: number // Stored as deci-percent (divide by 100)
    sensorTreeRoot: string
}

export interface RouteInfo {
    fromGeohash: string
    toGeohash: string
    transporter: string
    declaredAt: bigint
}

export interface DeliveryInfo {
    arrivedAt: bigint
    atGeohash: string
    receiptHash: string
}

export interface LotState {
    produccion: StageState
    procesoEmpaque: StageState
    transporte: StageState
    route: RouteInfo
    delivery: DeliveryInfo
}

export interface CertificateData {
    certType: string
    docHash: string
    issuer: string
    issuedAt: bigint
    expiresAt: bigint
    revoked: boolean
    sig: string
}

export interface FarmData {
    name: string
    region: string
    countryISO: string
    geohash: string
    cropFocus: string
    photoURI: string
    metaURI: string
}

// Types for event data structures
export interface StageEvent {
    lotId: bigint | undefined
    stage: number
    time: bigint | undefined
    contentHash: `0x${string}` | undefined
    avgTemp: number
    lastTemp: number
    avgHum: number
    lastHum: number
    avgSoil: number
    lastSoil: number
    sensorRoot: `0x${string}` | undefined
    blockNumber: bigint
    transactionHash: `0x${string}`
}

export interface RouteEvent {
    lotId: bigint | undefined
    fromGeohash: string
    toGeohash: string
    carrier: string
    eta: bigint | undefined
    blockNumber: bigint
    transactionHash: `0x${string}`
}

export interface DeliveryEvent {
    lotId: bigint | undefined
    destinationGeohash: string
    deliveredAt: bigint | undefined
    receiptHash: `0x${string}` | undefined
    blockNumber: bigint
    transactionHash: `0x${string}`
}

export interface TraceabilityEvents {
    stages: StageEvent[]
    routes: RouteEvent[]
    deliveries: DeliveryEvent[]
}

// Event configuration type
export interface EventConfig {
    type: 'event'
    name: string
    inputs: Array<{
        name: string
        type: string
        indexed?: boolean
    }>
}
