'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LotSearchForm() {
  const [lotId, setLotId] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!lotId.trim()) {
      alert('Por favor ingresa un ID de lote')
      return
    }

    const numericLotId = parseInt(lotId.trim())
    if (isNaN(numericLotId) || numericLotId < 0) {
      alert('El ID de lote debe ser un número válido')
      return
    }

    setIsSearching(true)
    
    // Navigate to the trace page
    router.push(`/trace/${numericLotId}`)
  }

  // Sample lot IDs for quick access - Based on TRAZABILIDAD.md
  const sampleLotIds = [101, 1, 2, 3]

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-green-200 p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-green-800 mb-4">
          🔍 Consulta la Trazabilidad
        </h2>
        <p className="text-green-600 text-lg">
          Ingresa el ID del lote para conocer su historia completa desde el campo hasta tu mesa
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-6">
          <label htmlFor="lotId" className="block text-green-800 font-medium mb-2">
            ID del Lote
          </label>
          <input
            type="text"
            id="lotId"
            value={lotId}
            onChange={(e) => setLotId(e.target.value)}
            className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none text-lg text-center font-mono"
            placeholder="Ej: 101"
            disabled={isSearching}
          />
        </div>

        <button
          type="submit"
          disabled={isSearching || !lotId.trim()}
          className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed transition-colors text-lg"
        >
          {isSearching ? (
            <>
              <span className="animate-spin inline-block mr-2">⏳</span>
              Consultando...
            </>
          ) : (
            'Consultar Trazabilidad'
          )}
        </button>
      </form>

      {/* Quick access buttons */}
      <div className="mt-8 pt-6 border-t-2 border-green-200">
        <p className="text-center text-green-600 mb-4 text-sm">
          O prueba con estos lotes de ejemplo (Lote 101 = Café Peruano completo):
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {sampleLotIds.map((id) => (
            <button
              key={id}
              onClick={() => router.push(`/trace/${id}`)}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
              disabled={isSearching}
            >
              Lote #{id}
            </button>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🌾</span>
          </div>
          <h3 className="font-bold text-green-800 mb-2">Origen Verificado</h3>
          <p className="text-green-600 text-sm">
            Conoce la finca, región y condiciones de cultivo
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="font-bold text-green-800 mb-2">Datos IoT</h3>
          <p className="text-green-600 text-sm">
            Temperatura, humedad y condiciones en tiempo real
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🏆</span>
          </div>
          <h3 className="font-bold text-green-800 mb-2">Certificaciones</h3>
          <p className="text-green-600 text-sm">
            Orgánico, comercio justo y otras certificaciones
          </p>
        </div>
      </div>
    </div>
  )
}