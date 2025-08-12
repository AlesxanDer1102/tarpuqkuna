import { Metadata } from 'next'
import TraceabilityView from '@/components/TraceabilityView'
import Link from 'next/link'
import { publicClient } from '@/utils/client'
import { agroTraceContract, certificatesContract, farmNFTContract } from '@/utils/constants'
import { Address, Hex } from 'viem'
import Trace from '@/components/Trace'
import { getFarmData } from '@/utils/farmData'

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

export interface LotLogs {
  args: LotHeader
}

export interface LotHeader {
  args: LotHeader
  amount: bigint       // 1000n
  harvestId: Hex       // "0x86bf..."
  id: bigint           // 101n
  owner: Address       // "0xf465..."
}

export interface LotMetadata {
  name: string
  description: string
  image: string
  attributes: Array<{
    trait_type: string
    value: string
  }>
}

// LotMeta array structure from contract
type LotMetaArray = readonly [
  bigint,    // 0: id
  Hex,       // 1: harvestId  
  string,    // 2: product
  string,    // 3: variety
  Address,       // 4: owner
  number,    // 5: amount (0 en el ejemplo)
  string,    // 6: tokenURI (base64 encoded JSON)
  boolean    // 7: exists
]

export interface HarvestHeader {
  farmNftId: bigint          // 1n
  harvestId: Hex   // "0x86bf..."
  product: string            // "cafe"
  startDate: bigint          // 1752298080n (segundos Unix)
}

export interface CertificateHeader {
  lotId: bigint           // 1n
  certKey: Hex           // "0x86bf..."
  certType: Hex    // "0xf465..."
  issuer: Address    // "0xf465..."
}

export default async function TracePage({ params }: TracePageProps) {
  const { lotId } = await params


  const LotMintedLogs = await publicClient.getContractEvents<
    typeof agroTraceContract.abi,
    'LotMinted'
  >({
    abi: agroTraceContract.abi,
    address: agroTraceContract.address,
    eventName: "LotMinted",
    fromBlock: BigInt(8959010),
    toBlock: BigInt(8959110),
    strict: true
  })

  const LotMeta = await publicClient.readContract({
    abi: agroTraceContract.abi,
    address: agroTraceContract.address,
    functionName: "lot",
    args: [BigInt(lotId)]
  }) as LotMetaArray
  
  console.log("LotMeta:", LotMeta)

  // Decode metadata from base64 encoded JSON (UTF-8 safe)
  let lotMetadata: LotMetadata | null = null
  try {
    if (LotMeta[6] && LotMeta[6].startsWith('data:application/json;base64,')) {
      const base64Data = LotMeta[6].replace('data:application/json;base64,', '')
      
      // Method 1: Using Buffer (Node.js compatible, handles UTF-8)
      const decodedJson = Buffer.from(base64Data, 'base64').toString('utf-8')
      
      // Alternative Method 2: Using TextDecoder (modern Web API, UTF-8 safe)
      // const binaryString = atob(base64Data)
      // const bytes = new Uint8Array(binaryString.length)
      // for (let i = 0; i < binaryString.length; i++) {
      //   bytes[i] = binaryString.charCodeAt(i)
      // }
      // const decodedJson = new TextDecoder('utf-8').decode(bytes)
      
      lotMetadata = JSON.parse(decodedJson) as LotMetadata
      console.log("Decoded Lot Metadata:", lotMetadata)
    }
  } catch (error) {
    console.error("Error decoding lot metadata:", error)
  }

  console.log("LotMinted Logs:", LotMintedLogs[0].args as LotHeader)



  const LotData = LotMintedLogs.find(log => log.args.id === BigInt(lotId))

  if (!LotData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header Navigation */}
          <header className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors"
            >
              <span className="text-xl">🌱</span>
              <span className="font-bold text-lg">TARPUQKUNA</span>
            </Link>
          </header>

          {/* Error Content */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center shadow-lg">
            <div className="text-6xl mb-4">📦❌</div>
            <h1 className="text-2xl font-bold text-red-800 mb-4">Lote No Encontrado</h1>
            <p className="text-red-600 mb-6">
              No se encontró ningún lote con el ID #{lotId} en la blockchain.
              Verifica que el número de lote sea correcto.
            </p>

            <div className="bg-red-100 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-red-800 mb-2">¿Qué puedes hacer?</h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Verifica que el ID del lote sea correcto</li>
                <li>• El lote puede no haber sido registrado aún</li>
                <li>• Contacta al productor para confirmar el ID</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md"
              >
                🔍 Buscar Otro Lote
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors shadow-md"
              >
                🏠 Volver al Inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const ArgsLot: LotHeader = LotData.args as LotHeader


  const HarvestLogs = await publicClient.getContractEvents<typeof agroTraceContract.abi, 'HarvestCreated'>({
    abi: agroTraceContract.abi,
    address: agroTraceContract.address,
    eventName: "HarvestCreated",
    args: {
      harvestId: ArgsLot.harvestId
    },
    fromBlock: BigInt(8959010),
    toBlock: BigInt(8959110),
  })

  const CertLogs = await publicClient.getContractEvents<typeof certificatesContract.abi, 'CertificateLinked'>({
    abi: certificatesContract.abi,
    address: certificatesContract.address,
    eventName: "CertificateLinked",
    args: {
      lotId: ArgsLot.id
    },
    fromBlock: BigInt(8959010),
    toBlock: BigInt(8959110),
  })

  console.log("HarvestCreated Logs:", HarvestLogs[0].args as HarvestHeader)

  console.log("CertificateLinked Logs:", CertLogs)

  if (!HarvestLogs || HarvestLogs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header Navigation */}
          <header className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors"
            >
              <span className="text-xl">🌱</span>
              <span className="font-bold text-lg">TARPUQKUNA</span>
            </Link>
          </header>

          {/* Error Content */}
          <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-8 text-center shadow-lg">
            <div className="text-6xl mb-4">🌾❓</div>
            <h1 className="text-2xl font-bold text-orange-800 mb-4">Cosecha No Encontrada</h1>
            <p className="text-orange-600 mb-6">
              No se encontraron registros de cosecha asociados al lote #{lotId}.
              Los datos de la cosecha pueden no estar disponibles aún.
            </p>

            <div className="bg-orange-100 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-orange-800 mb-2">Posibles causas:</h3>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• La cosecha aún no ha sido registrada en la blockchain</li>
                <li>• El lote existe pero faltan datos de cosecha</li>
                <li>• Error temporal en la sincronización de datos</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors shadow-md"
              >
                🔄 Reintentar
              </button>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors shadow-md"
              >
                🏠 Volver al Inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const ArgsHarvest: HarvestHeader = HarvestLogs[0].args as HarvestHeader


  const FarmData = await getFarmData(ArgsHarvest.farmNftId)

  console.log("FarmData:", FarmData)

  if (!FarmData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header Navigation */}
          <header className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors"
            >
              <span className="text-xl">🌱</span>
              <span className="font-bold text-lg">TARPUQKUNA</span>
            </Link>
          </header>

          {/* Error Content */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 text-center shadow-lg">
            <div className="text-6xl mb-4">🏡❓</div>
            <h1 className="text-2xl font-bold text-yellow-800 mb-4">Información de Finca No Disponible</h1>
            <p className="text-yellow-600 mb-6">
              No se encontraron los datos de la finca asociada a la cosecha del lote #{lotId}.
              La información del NFT de la finca puede no estar disponible temporalmente.
            </p>

            <div className="bg-yellow-100 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-yellow-800 mb-2">Datos disponibles del lote:</h3>
              <ul className="text-sm text-yellow-700 space-y-2">
                <li>• <strong>ID del Lote:</strong> #{lotId}</li>
                <li>• <strong>Producto:</strong> {ArgsHarvest.product}</li>
                <li>• <strong>ID de Finca NFT:</strong> {ArgsHarvest.farmNftId.toString()}</li>
                <li>• <strong>Cantidad:</strong> {ArgsLot.amount.toString()} kg</li>
              </ul>
            </div>

            <div className="bg-yellow-100 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-yellow-800 mb-2">Posibles causas:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• El NFT de la finca no ha sido creado aún</li>
                <li>• Problemas de conectividad con IPFS</li>
                <li>• El metadata de la finca está siendo procesado</li>
                <li>• Error temporal en la carga de datos externos</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors shadow-md"
              >
                🔄 Recargar Página
              </button>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors shadow-md"
              >
                🏠 Volver al Inicio
              </Link>
              <Link
                href={`https://sepolia.etherscan.io/address/${farmNFTContract.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                🔗 Ver Contrato NFT ↗
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }


  // Validate lotId is numeric
  const numericLotId = parseInt(lotId)
  if (isNaN(numericLotId) || numericLotId < 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center shadow-lg">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-red-800 mb-4">ID de Lote Inválido</h1>
            <p className="text-red-600 mb-6">
              El ID de lote debe ser un número válido. Recibido: {lotId}
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md"
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
      <header className="bg-white shadow-sm border-b border-green-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors"
          >
            <span className="text-xl">🌱</span>
            <span className="font-bold text-lg">TARPUQKUNA</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="text-green-800 text-right">
              <span className="text-sm text-green-600">Consultando lote</span>
              <div className="font-bold text-lg">#{lotId}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-green-600" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-green-800 transition-colors">Inicio</Link>
            <span>→</span>
            <span className="text-green-800 font-medium">Trazabilidad Lote #{lotId}</span>
          </nav>

          {/* Page Title */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-green-800 mb-4">
              🔍 Trazabilidad Completa
            </h1>
            <p className="text-lg text-green-600 max-w-2xl mx-auto">
              Sigue el recorrido completo del lote #{lotId} desde el campo hasta tu mesa
              con información verificada en blockchain.
            </p>
          </div>

          {/* Traceability Components */}
          <section className="space-y-8">
            <TraceabilityView
              lotId={lotId}
              farmData={FarmData}
              harvestData={{
                product: ArgsHarvest.product,
                startDate: ArgsHarvest.startDate,
                farmNftId: ArgsHarvest.farmNftId
              }}
              lotData={{
                amount: ArgsLot.amount,
                owner: ArgsLot.owner
              }}
              lotMeta={{
                id: LotMeta[0],
                harvestId: LotMeta[1],
                product: LotMeta[2],
                variety: LotMeta[3],
                owner: LotMeta[4],
                amount: LotMeta[5],
                tokenURI: LotMeta[6],
                exists: LotMeta[7],
                metadata: lotMetadata
              }}
              certificates={CertLogs.map(cert => ({
                certType: cert.args.certType || '',
                certKey: cert.args.certKey || '',
                issuer: cert.args.issuer || '',
                transactionHash: cert.transactionHash,
                blockNumber: cert.blockNumber
              }))}
            />
            <Trace lotId={lotId} />
          </section>

          {/* Blockchain Verification */}
          <section className="bg-white rounded-2xl shadow-lg border-2 border-green-200 p-8">
            <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
              🔗 Verificación Blockchain
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                  ✅ Datos Verificables
                </h3>
                <ul className="space-y-3 text-green-700">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                    Origen autenticado en blockchain
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                    Datos IoT inmutables
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                    Certificaciones verificadas
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                    Cadena de custodia completa
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                  🔍 Explorar en Blockchain
                </h3>
                <p className="text-blue-700 mb-4">
                  Todos los datos mostrados están respaldados por transacciones en la blockchain de Ethereum (Sepolia).
                </p>
                <div className="space-y-2">
                  <a
                    href={`https://sepolia.etherscan.io/address/${agroTraceContract.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                  >
                    🔗 Contrato AgroTrace ↗
                  </a>
                  <a
                    href={`https://sepolia.etherscan.io/address/${farmNFTContract.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-md"
                  >
                    🏡 Contrato FarmNFT ↗
                  </a>
                  <a
                    href={`https://sepolia.etherscan.io/address/${certificatesContract.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors shadow-md"
                  >
                    🏆 Contrato Certificados ↗
                  </a>
                </div>
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
          </section>

          {/* Footer Actions */}
          <div className="text-center py-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md"
            >
              🔍 Consultar Otro Lote
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}