export default function ProcessorPage() {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          🏭 Panel del Procesador
        </h1>
        <p className="text-xl text-green-600">
          Transformación y procesamiento de materias primas
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">⚙️ Registrar Proceso</h3>
          <p className="text-green-600 mb-4">
            Registra un nuevo proceso de transformación de productos.
          </p>
          <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Nuevo Proceso
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">🔍 Control de Calidad</h3>
          <p className="text-green-600 mb-4">
            Realiza controles de calidad y registra resultados.
          </p>
          <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Iniciar Control
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">📦 Productos Procesados</h3>
          <p className="text-green-600 mb-4">
            Consulta el historial de productos procesados.
          </p>
          <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Ver Historial
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">📊 Reportes</h3>
          <p className="text-green-600 mb-4">
            Genera reportes de procesos y calidad.
          </p>
          <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Generar Reportes
          </button>
        </div>
      </div>
    </div>
  )
}