// import { useAccount, useChainId, useWriteContract } from "wagmi"

export default function ProducerPage() {

  
  // const {address} = useAccount()
  // const chainId = useChainId()

  // const {
  //       data: approvalHash,
  //       isPending: isApprovalPending,
  //       writeContract: approveNft,
  //       error: approvalError,
  //   } = useWriteContract()

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          🌾 Panel del Productor
        </h1>
        <p className="text-xl text-green-600">
          Registro y gestión de cultivos y producción agrícola
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">📝 Registrar Nuevo Lote</h3>
          <p className="text-green-600 mb-4">
            Crea un nuevo lote de producción con información de origen y cultivo.
          </p>
          <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Crear Lote
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">📊 Datos IoT</h3>
          <p className="text-green-600 mb-4">
            Visualiza y registra datos de sensores de campo.
          </p>
          <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Ver Sensores
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">🏆 Certificaciones</h3>
          <p className="text-green-600 mb-4">
            Gestiona certificaciones orgánicas y de comercio justo.
          </p>
          <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Gestionar Certificados
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">📋 Mis Lotes</h3>
          <p className="text-green-600 mb-4">
            Consulta y gestiona todos tus lotes registrados.
          </p>
          <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Ver Lotes
          </button>
        </div>
      </div>
    </div>
  )
}