import { publicClient } from "@/utils/client"
import { agroTraceContract, farmNFTContract, certificatesContract, CERTIFICATE_TYPES } from "@/utils/constants"
import { parseAbiItem } from "viem"


interface TraceabilityViewProps {
    lotId: string,
    block: bigint,
    toBlock: bigint
}

export default async function Trace({ lotId, block, toBlock }: TraceabilityViewProps) {

    // Get LotMinted data first
    const LotMinted = await publicClient.getLogs({
        fromBlock: block,
        toBlock: toBlock,
        address: agroTraceContract.address,
        event: parseAbiItem("event LotMinted(uint256 indexed id, bytes32 indexed harvestId, uint256 amount, address owner)"),
        args: {
            id: BigInt(lotId)
        },
    })

    // Get HarvestCreated data using harvestId from LotMinted
    const harvestId = LotMinted[0]?.args?.harvestId
    const HarvestCreated = harvestId ? await publicClient.getLogs({
        fromBlock: block,
        toBlock: toBlock,
        address: agroTraceContract.address,
        event: parseAbiItem("event HarvestCreated(bytes32 indexed harvestId, uint256 indexed farmNftId, string product, uint64 startDate)"),
        args: {
            harvestId: harvestId
        },
    }) : []

    // Get CertificateLinked data
    const CertificateLinked = await publicClient.getLogs({
        fromBlock: block,
        toBlock: toBlock,
        address: certificatesContract.address,
        event: parseAbiItem("event CertificateLinked(uint256 indexed lotId, bytes32 indexed certKey, bytes32 certType, address issuer)"),
        args: {
            lotId: BigInt(lotId)
        },
    })

    const Delivered = await publicClient.getLogs({
        fromBlock: block,
        toBlock: toBlock,
        address: agroTraceContract.address,
        event: parseAbiItem("event Delivered(uint256 indexed lotId, bytes12 destinationGeohash, uint64 deliveredAt, bytes32 receiptHash)"),
        args: {
            lotId: BigInt(lotId)
        },

    })

    const StageAnchored = await publicClient.getLogs({
        fromBlock: block,
        toBlock: toBlock,
        address: agroTraceContract.address,
        event: {
            name: "StageAnchored",
            type: "event",
            inputs: [
                {
                    indexed: true,
                    name: "lotId",
                    type: "uint256"
                },
                {
                    indexed: true,
                    name: "stage",
                    type: "uint8"
                },
                {
                    indexed: false,
                    name: "time",
                    type: "uint64"
                },
                {
                    indexed: false,
                    name: "contentHash",
                    type: "bytes32"
                },
                {
                    indexed: false,
                    name: "avgTemp_cDeci",
                    type: "int32"
                },
                {
                    indexed: false,
                    name: "lastTemp_cDeci",
                    type: "int32"
                },
                {
                    indexed: false,
                    name: "avgHumRel_pDeci",
                    type: "int32"
                },
                {
                    indexed: false,
                    name: "lastHumRel_pDeci",
                    type: "int32"
                },
                {
                    indexed: false,
                    name: "avgSoilMoist_pDeci",
                    type: "int32"
                },
                {
                    indexed: false,
                    name: "lastSoilMoist_pDeci",
                    type: "int32"
                },
                {
                    indexed: false,
                    name: "sensorRoot",
                    type: "bytes32"
                }
            ]

        },
        args: {
            lotId: BigInt(lotId)
        },
    })

    const StateChanged = await publicClient.getLogs({
        fromBlock: block,
        toBlock: toBlock,
        address: agroTraceContract.address,
        event: {
            "inputs": [
                {
                    indexed: true,
                    name: "id",
                    type: "uint256"
                },
                {
                    indexed: false,
                    name: "newState",
                    type: "uint8"
                },
                {
                    indexed: false,
                    name: "time",
                    type: "uint64"
                }
            ],
            name: "StateChanged",
            type: "event"
        },
        args: {
            id: BigInt(lotId)
        },

    })

    // Helper functions
    const formatTimestamp = (timestamp: bigint) => {
        return new Date(Number(timestamp) * 1000).toLocaleString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const formatTemperature = (temp: number) => (temp / 100).toFixed(1) + "°C"
    const formatHumidity = (hum: number) => (hum / 100).toFixed(1) + "%"
    const formatSoilMoisture = (moisture: number) => moisture === 0 ? "N/A" : (moisture / 100).toFixed(1) + "%"

    const getStageLabel = (stage: number) => {
        const stageNames = ["Producción", "Proceso y Empaque", "Transporte", "Llegada"]
        return stageNames[stage] || `Etapa ${stage}`
    }

    const getStateLabel = (state: number) => {
        const stateNames = ["En Finca", "En Proceso", "En Tránsito", "En Aduana", "En Bodega", "Entregado", "Cerrado"]
        return stateNames[state] || `Estado ${state}`
    }

    const truncateHash = (hash: string, length: number = 8) => {
        return `${hash.slice(0, length)}...${hash.slice(-length)}`
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

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg border-2 border-green-200 p-8">
                <h1 className="text-3xl font-bold text-green-800 mb-6 flex items-center gap-3">
                    📦 Trazabilidad del Lote #{lotId}
                </h1>

                {/* Lot Origin Information */}
                {LotMinted.length > 0 && (
                    <div className="mb-8 p-6 bg-amber-50 rounded-xl border-2 border-amber-200">
                        <h2 className="text-xl font-semibold text-amber-800 mb-4 flex items-center gap-2">
                            🌾 Información del Lote
                        </h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-amber-200">
                                <div className="text-amber-600 font-medium text-sm">📊 Cantidad</div>
                                <div className="font-bold text-amber-800 text-lg">
                                    {LotMinted[0].args.amount?.toString()} kg
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-amber-200">
                                <div className="text-amber-600 font-medium text-sm">👨‍🌾 Propietario</div>
                                <div className="font-mono text-sm text-amber-800">
                                    {truncateHash(LotMinted[0].args.owner as string)}
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-amber-200">
                                <div className="text-amber-600 font-medium text-sm">🆔 ID de Cosecha</div>
                                <div className="font-mono text-xs text-amber-800">
                                    {truncateHash(LotMinted[0].args.harvestId as string)}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 p-3 bg-white rounded-lg border border-amber-200 text-xs text-gray-500 space-y-1">
                            <div>
                                🔗 Transacción:
                                <a
                                    href={`https://sepolia.etherscan.io/tx/${LotMinted[0].transactionHash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline ml-1"
                                >
                                    {truncateHash(LotMinted[0].transactionHash)}
                                </a>
                                <span className="text-gray-400 ml-1">↗</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Harvest Information */}
                {HarvestCreated.length > 0 && (
                    <div className="mb-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                        <h2 className="text-xl font-semibold text-yellow-800 mb-4 flex items-center gap-2">
                            🌱 Información de la Cosecha
                        </h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="bg-white p-4 rounded-xl border border-yellow-200">
                                <div className="text-yellow-600 font-medium text-sm">🌾 Producto</div>
                                <div className="font-bold text-yellow-800 text-lg capitalize">
                                    {HarvestCreated[0].args.product}
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-yellow-200">
                                <div className="text-yellow-600 font-medium text-sm">📅 Fecha de Inicio</div>
                                <div className="font-semibold text-yellow-800">
                                    {formatTimestamp(HarvestCreated[0].args.startDate as bigint)}
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-yellow-200">
                                <div className="text-yellow-600 font-medium text-sm">🏪 ID de Finca</div>
                                <div className="font-bold text-yellow-800 text-lg mb-2">
                                    #{HarvestCreated[0].args.farmNftId?.toString()}
                                </div>
                                <a
                                    href={`https://sepolia.etherscan.io/token/${farmNFTContract.address}?a=${HarvestCreated[0].args.farmNftId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-600 hover:text-blue-800 underline"
                                >
                                    🔗 Ver NFT ↗
                                </a>
                            </div>
                        </div>
                        <div className="mt-4 p-3 bg-white rounded-lg border border-yellow-200 text-xs text-gray-500 space-y-1">
                            <div>
                                🔗 Transacción:
                                <a
                                    href={`https://sepolia.etherscan.io/tx/${HarvestCreated[0].transactionHash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline ml-1"
                                >
                                    {truncateHash(HarvestCreated[0].transactionHash)}
                                </a>
                                <span className="text-gray-400 ml-1">↗</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Certificates Section */}
                {CertificateLinked.length > 0 && (
                    <div className="mb-8 p-6 bg-purple-50 rounded-xl border-2 border-purple-200">
                        <h2 className="text-xl font-semibold text-purple-800 mb-4 flex items-center gap-2">
                            🏆 Certificaciones del Lote
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {CertificateLinked.map((cert, index) => {
                                const certInfo = getCertificateType(cert.args.certType as string)
                                return (
                                    <div key={index} className={`bg-white p-4 rounded-xl border-2 border-${certInfo.color}-200`}>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-2xl">{certInfo.emoji}</span>
                                            <div>
                                                <h3 className={`font-bold text-${certInfo.color}-800 text-lg`}>
                                                    {certInfo.name}
                                                </h3>
                                                <p className={`text-${certInfo.color}-600 text-sm`}>
                                                    Certificado Verificado
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-2 text-sm">
                                            <div className={`text-${certInfo.color}-700`}>
                                                <span className="font-medium">Emisor:</span>
                                                <div className="font-mono text-xs mt-1">
                                                    {truncateHash(cert.args.issuer as string)}
                                                </div>
                                            </div>
                                            <div className={`text-${certInfo.color}-700`}>
                                                <span className="font-medium">Clave del Certificado:</span>
                                                <div className="font-mono text-xs mt-1">
                                                    {truncateHash(cert.args.certKey as string)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-500 space-y-1">
                                            <div>
                                                🔗 Transacción:
                                                <a
                                                    href={`https://sepolia.etherscan.io/tx/${cert.transactionHash}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 underline ml-1"
                                                >
                                                    {truncateHash(cert.transactionHash)}
                                                </a>
                                                <span className="text-gray-400 ml-1">↗</span>
                                            </div>
                                            <div>📦 Bloque:
                                                <a
                                                    href={`https://sepolia.etherscan.io/block/${cert.blockNumber}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 underline ml-1"
                                                >
                                                    #{cert.blockNumber.toString()}
                                                </a>
                                                <span className="text-gray-400 ml-1">↗</span>
                                            </div>
                                            <div>
                                                📜 Contrato de Certificados:
                                                <a
                                                    href={`https://sepolia.etherscan.io/address/${certificatesContract.address}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 underline ml-1"
                                                >
                                                    Ver Contrato ↗
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* Current State */}
                {StateChanged.length > 0 && (
                    <div className="mb-8 p-6 bg-green-50 rounded-xl border-2 border-green-200">
                        <h2 className="text-xl font-semibold text-green-800 mb-2 flex items-center gap-2">
                            🏷️ Estado Actual
                        </h2>
                        <div className="text-lg text-green-700">
                            <span className="font-medium">{getStateLabel(StateChanged[StateChanged.length - 1].args.newState as number)}</span>
                            <span className="text-sm text-gray-600 ml-2">
                                ({formatTimestamp(StateChanged[StateChanged.length - 1].args.time as bigint)})
                            </span>
                        </div>
                    </div>
                )}

                {/* Stage Timeline */}
                {StageAnchored.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                            📈 Historial de Etapas
                        </h2>
                        <div className="space-y-4">
                            {StageAnchored.map((event, index) => (
                                <div key={index} className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-lg font-semibold text-green-800 flex items-center gap-2">
                                            {event.args.stage === 0 && "🌱"}
                                            {event.args.stage === 1 && "📦"}
                                            {event.args.stage === 2 && "🚛"}
                                            {event.args.stage === 3 && "🏪"}
                                            {getStageLabel(event.args.stage as number)}
                                        </h3>
                                        <span className="text-sm text-green-600 bg-white px-3 py-1 rounded-lg">
                                            {formatTimestamp(event.args.time as bigint)}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                        <div className="bg-white p-4 rounded-xl border border-green-200">
                                            <div className="text-green-600 font-medium">🌡️ Temp. Promedio</div>
                                            <div className="font-bold text-blue-600 text-lg">
                                                {formatTemperature(event.args.avgTemp_cDeci as number)}
                                            </div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl border border-green-200">
                                            <div className="text-green-600 font-medium">🌡️ Temp. Última</div>
                                            <div className="font-bold text-blue-600 text-lg">
                                                {formatTemperature(event.args.lastTemp_cDeci as number)}
                                            </div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl border border-green-200">
                                            <div className="text-green-600 font-medium">💧 Humedad Prom.</div>
                                            <div className="font-bold text-blue-500 text-lg">
                                                {formatHumidity(event.args.avgHumRel_pDeci as number)}
                                            </div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl border border-green-200">
                                            <div className="text-green-600 font-medium">💧 Humedad Última</div>
                                            <div className="font-bold text-blue-500 text-lg">
                                                {formatHumidity(event.args.lastHumRel_pDeci as number)}
                                            </div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl border border-green-200">
                                            <div className="text-green-600 font-medium">🌱 H. Suelo Prom.</div>
                                            <div className="font-bold text-green-600 text-lg">
                                                {formatSoilMoisture(event.args.avgSoilMoist_pDeci as number)}
                                            </div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl border border-green-200">
                                            <div className="text-green-600 font-medium">🌱 H. Suelo Última</div>
                                            <div className="font-bold text-green-600 text-lg">
                                                {formatSoilMoisture(event.args.lastSoilMoist_pDeci as number)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 p-3 bg-white rounded-lg border border-green-200 text-xs text-gray-500 space-y-2">
                                        <div>🔒 Hash de Contenido: <code className="bg-gray-100 px-1 rounded">{truncateHash(event.args.contentHash as string)}</code></div>
                                        <div>📡 Raíz de Sensores: <code className="bg-gray-100 px-1 rounded">{truncateHash(event.args.sensorRoot as string)}</code></div>
                                        <div className="pt-2 border-t border-green-200">
                                            🔗 Transacción:
                                            <a
                                                href={`https://sepolia.etherscan.io/tx/${event.transactionHash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 underline ml-1"
                                            >
                                                {truncateHash(event.transactionHash)}
                                            </a>
                                            <span className="text-gray-400 ml-1">↗</span>
                                        </div>
                                        <div>📦 Bloque:
                                            <a
                                                href={`https://sepolia.etherscan.io/block/${event.blockNumber}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 underline ml-1"
                                            >
                                                #{event.blockNumber.toString()}
                                            </a>
                                            <span className="text-gray-400 ml-1">↗</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Delivery Information */}
                {Delivered.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                            🚚 Información de Entrega
                        </h2>
                        {Delivered.map((event, index) => (
                            <div key={index} className="bg-green-50 rounded-xl p-6 border-2 border-green-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white p-4 rounded-xl border border-green-200">
                                        <div className="text-sm text-green-600 font-medium mb-1">📅 Fecha de Entrega</div>
                                        <div className="font-bold text-green-700 text-lg">
                                            {formatTimestamp(event.args.deliveredAt as bigint)}
                                        </div>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-green-200">
                                        <div className="text-sm text-green-600 font-medium mb-1">📍 Geohash de Destino</div>
                                        <div className="font-mono text-sm text-gray-800 bg-gray-100 p-2 rounded">
                                            {event.args.destinationGeohash}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 p-3 bg-white rounded-lg border border-green-200 text-xs text-gray-500 space-y-2">
                                    <div>🧾 Hash de Recibo: <code className="bg-gray-100 px-1 rounded">{truncateHash(event.args.receiptHash as string)}</code></div>
                                    <div className="pt-2 border-t border-green-200">
                                        🔗 Transacción:
                                        <a
                                            href={`https://sepolia.etherscan.io/tx/${event.transactionHash}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 underline ml-1"
                                        >
                                            {truncateHash(event.transactionHash)}
                                        </a>
                                        <span className="text-gray-400 ml-1">↗</span>
                                    </div>
                                    <div>📦 Bloque:
                                        <a
                                            href={`https://sepolia.etherscan.io/block/${event.blockNumber}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 underline ml-1"
                                        >
                                            #{event.blockNumber.toString()}
                                        </a>
                                        <span className="text-gray-400 ml-1">↗</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* State Changes History */}
                {StateChanged.length > 1 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-green-800 mb-4 flex items-center gap-2">
                            📋 Historial de Estados
                        </h2>
                        <div className="space-y-3">
                            {StateChanged.map((event, index) => (
                                <div key={index} className="bg-green-50 rounded-xl border border-green-200 p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="font-medium text-green-800 flex items-center gap-2">
                                            {event.args.newState === 5 && "✅"}
                                            {event.args.newState === 0 && "🌱"}
                                            {event.args.newState === 1 && "⚙️"}
                                            {event.args.newState === 2 && "🚛"}
                                            {event.args.newState === 3 && "🏛️"}
                                            {event.args.newState === 4 && "📦"}
                                            {event.args.newState === 6 && "🔒"}
                                            {getStateLabel(event.args.newState as number)}
                                        </div>
                                        <div className="text-sm text-green-600 bg-white px-3 py-1 rounded-lg">
                                            {formatTimestamp(event.args.time as bigint)}
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-500 bg-white p-2 rounded border border-green-200 space-y-1">
                                        <div>
                                            🔗 Transacción:
                                            <a
                                                href={`https://sepolia.etherscan.io/tx/${event.transactionHash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 underline ml-1"
                                            >
                                                {truncateHash(event.transactionHash)}
                                            </a>
                                            <span className="text-gray-400 ml-1">↗</span>
                                        </div>
                                        <div>📦 Bloque:
                                            <a
                                                href={`https://sepolia.etherscan.io/block/${event.blockNumber}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 underline ml-1"
                                            >
                                                #{event.blockNumber.toString()}
                                            </a>
                                            <span className="text-gray-400 ml-1">↗</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {StageAnchored.length === 0 && StateChanged.length === 0 && Delivered.length === 0 && (
                    <div className="text-center py-12 text-green-600">
                        <div className="text-6xl mb-4">📦</div>
                        <div className="text-lg mb-2 font-medium">No se encontraron eventos de trazabilidad</div>
                        <div className="text-sm">Para el lote #{lotId}</div>
                    </div>
                )}
            </div>
        </div>
    )

}