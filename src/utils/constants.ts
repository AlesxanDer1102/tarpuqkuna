import { AGROTRACE_ADDRESS, agroTraceAbi, CERTIFICATES_ADDRESS, certificatesAbi, FARM_NFT_ADDRESS, farmNFTAbi } from "@/constants"

// AgroTrace contract functions
export const agroTraceContract = {
    address: AGROTRACE_ADDRESS as `0x${string}`,
    abi: agroTraceAbi,
} as const

export const certificatesContract = {
    address: CERTIFICATES_ADDRESS as `0x${string}`,
    abi: certificatesAbi,
} as const

export const farmNFTContract = {
    address: FARM_NFT_ADDRESS as `0x${string}`,
    abi: farmNFTAbi,
} as const


export const CERTIFICATE_TYPES = {
  ORGANIC: '0xef98812770676b1009c3f028f317d97db383be2fdf4a1f7efcbb1a28c990e47b',
  FAIR_TRADE: '0x4e6faf495256fb1a4e8277e54f609be8b4fc26171639260eb694f3d6fb424a3f',
} as const

export const ACTOR_ROLES = {
  PRODUCER: '0xa26228957b4ff1ee8d2f4555d58f130924b7939446a6af38afd42a510a51fbb4',
  PROCESSOR: '0x1a198eab081ff2fdf827cecb74218150a4ed14b0316f72d621b91ae4d91a466d',
  TRANSPORTER: '0x7c2d301983a60156b882648bf1c7210b103e1d4715ba229e6182e4f8ecd987be',
  INSPECTOR: '0x6708279cb5b7899861c476830845b35dc693bcddf85695a204b94cda1c825834',
  RETAILER: '0x27d5ccc46db01bfa5691ce092fe276221c6cd0aa6d05765b52c3ddecfa70421a',
} as const

// LotState enum values - From MISSING_DATA.md
export const LOT_STATES = {
  EnFinca: 0,      // En Finca  
  EnProceso: 1,    // En Proceso
  EnTransito: 2,   // En Tránsito
  EnAduana: 3,     // En Aduana
  EnBodega: 4,     // En Bodega
  Entregado: 5,    // Entregado
  Cerrado: 6       // Cerrado
} as const

// Stage enum values - From MISSING_DATA.md
export const STAGES = {
  Produccion: 0,      // Producción
  ProcesoEmpaque: 1,  // Proceso y Empaque
  Transporte: 2,      // Transporte
  Llegada: 3          // Llegada
} as const

// Event logs storage
export const eventLogs = {
  delivered: [] as any[],
  stageAnchored: [] as any[],
  stateChanged: [] as any[]
} as const

