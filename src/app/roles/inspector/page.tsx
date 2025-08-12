
export default function InspectorPage() {


  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          🔍 Panel del Inspector
        </h1>
        <p className="text-xl text-green-600">
          Control de calidad e inspecciones de cumplimiento
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">📋 Nueva Inspección</h3>
          <p className="text-green-600 mb-4">
            Realiza una nueva inspección de calidad y cumplimiento.
          </p>
          <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Iniciar Inspección
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">🏆 Certificar Lote</h3>
          <p className="text-green-600 mb-4">
            Emite certificaciones de calidad para lotes aprobados.
          </p>
          <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Emitir Certificado
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">📊 Reportes de Calidad</h3>
          <p className="text-green-600 mb-4">
            Consulta historial de inspecciones y resultados.
          </p>
          <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Ver Reportes
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-4">⚠️ Incidencias</h3>
          <p className="text-green-600 mb-4">
            Registra y gestiona incidencias de calidad.
          </p>
          <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Gestionar Incidencias
          </button>
        </div>
      </div>
    </div>
  )
}