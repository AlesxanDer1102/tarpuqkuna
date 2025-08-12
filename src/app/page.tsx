import LotSearchForm from '@/components/LotSearchForm'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              🌱 TARPUQKUNA
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100">
              Trazabilidad Transparente de Productos Agrícolas
            </p>
            <p className="text-lg text-green-200 max-w-3xl mx-auto">
              Sistema blockchain que garantiza la transparencia completa desde la finca 
              hasta tu mesa. Conoce el origen, proceso y calidad de tus alimentos.
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 text-6xl">🌾</div>
          <div className="absolute top-32 right-20 text-4xl">🏭</div>
          <div className="absolute bottom-20 left-20 text-5xl">🚛</div>
          <div className="absolute bottom-10 right-10 text-6xl">🏪</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <LotSearchForm />
        
        {/* Roles Access Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg border-2 border-green-200 p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              👥 Acceso por Roles
            </h2>
            <p className="text-green-600">
              Accede al panel específico según tu rol en la cadena de suministro
            </p>
          </div>
          
          <div className="flex justify-center">
            <a
              href="/roles"
              className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors text-lg flex items-center gap-2"
            >
              <span>🚀</span>
              Acceder al Panel de Roles
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              ¿Por qué TARPUQKUNA?
            </h2>
            <p className="text-green-600 text-lg">
              La primera plataforma de trazabilidad agrícola completamente transparente
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="font-bold text-green-800 mb-2">Inmutable</h3>
              <p className="text-green-600">
                Los datos no pueden ser alterados una vez registrados en blockchain
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👁️</span>
              </div>
              <h3 className="font-bold text-green-800 mb-2">Transparente</h3>
              <p className="text-green-600">
                Información verificable públicamente en tiempo real
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="font-bold text-green-800 mb-2">Global</h3>
              <p className="text-green-600">
                Estándares internacionales para cadenas de suministro
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="font-bold text-green-800 mb-2">Verificable</h3>
              <p className="text-green-600">
                Cada dato puede ser verificado independientemente
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-green-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              ¿Cómo Funciona?
            </h2>
            <p className="text-green-600 text-lg">
              Sigue el viaje de tu producto en 4 etapas principales
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
              <div className="text-4xl mb-4">🌾</div>
              <h3 className="font-bold text-green-800 mb-2">1. Producción</h3>
              <p className="text-green-600 text-sm">
                Registro de origen, condiciones de cultivo y datos de sensores IoT
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
              <div className="text-4xl mb-4">🏭</div>
              <h3 className="font-bold text-green-800 mb-2">2. Procesamiento</h3>
              <p className="text-green-600 text-sm">
                Transformación del producto con control de calidad y trazabilidad
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
              <div className="text-4xl mb-4">🚛</div>
              <h3 className="font-bold text-green-800 mb-2">3. Transporte</h3>
              <p className="text-green-600 text-sm">
                Seguimiento de rutas, condiciones y paradas durante el envío
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="font-bold text-green-800 mb-2">4. Entrega</h3>
              <p className="text-green-600 text-sm">
                Confirmación de llegada al destino final con recibo verificable
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">🌱 TARPUQKUNA</h3>
            <p className="text-green-200">
              Transparencia en cada paso de la cadena alimentaria
            </p>
          </div>
          
          <div className="border-t border-green-700 pt-6">
            <p className="text-green-300 text-sm">
              Powered by Blockchain Technology • 
              <a href="https://sepolia.etherscan.io" target="_blank" rel="noopener noreferrer" className="hover:text-white ml-1">
                Verificar en Etherscan ↗
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
