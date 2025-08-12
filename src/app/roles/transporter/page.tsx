export default function TransporterPage() {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          🚛 Panel del Transportista
        </h1>
        <p className="text-xl text-green-600">
          Gestión de logística y transporte de productos
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">🚚 Registrar Envío</h3>
          <p className="text-green-600 mb-4">
            Crea un nuevo registro de envío con destino y condiciones.
          </p>
          <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Nuevo Envío
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">🗺️ Seguimiento</h3>
          <p className="text-green-600 mb-4">
            Monitorea rutas y ubicación en tiempo real.
          </p>
          <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Ver Mapa
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">🌡️ Condiciones de Envío</h3>
          <p className="text-green-600 mb-4">
            Registra temperatura, humedad y otras condiciones.
          </p>
          <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Registrar Datos
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">✅ Confirmar Entrega</h3>
          <p className="text-green-600 mb-4">
            Confirma la entrega exitosa en destino.
          </p>
          <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Confirmar Entrega
          </button>
        </div>
      </div>
    </div>
  )
}