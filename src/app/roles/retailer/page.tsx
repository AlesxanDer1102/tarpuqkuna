export default function RetailerPage() {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          🏪 Panel del Minorista
        </h1>
        <p className="text-xl text-green-600">
          Gestión de inventario y ventas al consumidor final
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">📦 Recibir Productos</h3>
          <p className="text-green-600 mb-4">
            Registra la recepción de nuevos productos en inventario.
          </p>
          <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Recibir Productos
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">💰 Registrar Venta</h3>
          <p className="text-green-600 mb-4">
            Registra ventas y mantén la trazabilidad hasta el cliente.
          </p>
          <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Nueva Venta
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">📋 Inventario</h3>
          <p className="text-green-600 mb-4">
            Consulta y gestiona el inventario actual.
          </p>
          <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Ver Inventario
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">🔍 Verificar Origen</h3>
          <p className="text-green-600 mb-4">
            Verifica el origen y trazabilidad de productos.
          </p>
          <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Verificar Productos
          </button>
        </div>
      </div>
    </div>
  )
}