"use client"
import { agroTraceAbi } from "@/constants"
import { agroTraceContract } from "@/utils/constants"
import { useState } from "react"
import { Address } from "viem"
import { useAccount, useChainId, useWriteContract } from "wagmi"

interface FarmData {
  farmNftId: bigint,
  harvestId: `0x${string}`,
  product: string,
  variety: string,
  unit: `0x${string}`,
  unitDecimals: number,
  tokenURI: string,
  active: boolean
}

interface MetadataAttribute {
  trait_type: string
  value: string
}

interface LotMetadata {
  name: string
  description: string
  image: string
  attributes: MetadataAttribute[]
}

interface FormData {
  id: string
  farmName: string
  product: string
  variety: string
  quantity: string
  quantityUnit: string
  description: string
  image: string
  farmNftId: string
  harvestId: string
  unit: string
  unitDecimals: string
  amount: string
}

export default function ProducerPage() {
  const { address } = useAccount()
  const chainId = useChainId()

  const [id, setId] = useState<bigint>()
  const [farmData, setFarmData] = useState<FarmData>()
  const [amount, setAmount] = useState<bigint>()
  const [owner, setOwner] = useState<Address>(address as Address)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    id: '',
    farmName: '',
    product: '',
    variety: '',
    quantity: '',
    quantityUnit: 'KG',
    description: '',
    image: '',
    farmNftId: '',
    harvestId: '',
    unit: '',
    unitDecimals: '0',
    amount: ''
  })

  const {
    data: approvalHash,
    isPending: isApprovalPending,
    writeContract: mintLot,
    error: approvalError,
  } = useWriteContract()

  const generateTokenURI = (metadata: LotMetadata): string => {
    const jsonString = JSON.stringify(metadata)
    const base64 = btoa(jsonString)
    return `data:application/json;base64,${base64}`
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmitForm = () => {
    const metadata: LotMetadata = {
      name: `Lote ${formData.id} - ${formData.product} ${formData.variety}`,
      description: formData.description,
      image: formData.image,
      attributes: [
        { trait_type: "Farm", value: formData.farmName },
        { trait_type: "Product", value: formData.product },
        { trait_type: "Variety", value: formData.variety },
        { trait_type: "Quantity", value: `${formData.quantity} ${formData.quantityUnit}` }
      ]
    }

    const tokenURI = generateTokenURI(metadata)

    const farmDataObj: FarmData = {
      farmNftId: BigInt(formData.farmNftId),
      harvestId: formData.harvestId as `0x${string}`,
      product: formData.product,
      variety: formData.variety,
      unit: formData.unit as `0x${string}`,
      unitDecimals: parseInt(formData.unitDecimals),
      tokenURI,
      active: true
    }

    setId(BigInt(formData.id))
    setFarmData(farmDataObj)
    setAmount(BigInt(formData.amount))
    setOwner(address as Address)

    console.log("data", { id, farmDataObj, amount, owner })

    setShowForm(false)
  }

  const handleMintLot = async () => {
    if (!id || !farmData || !amount || !owner) return
    try {
      mintLot({
        abi: agroTraceAbi,
        address: agroTraceContract.address,
        functionName: "mintLot",
        args: [id, { ...farmData }, amount, owner]
      })
    } catch {
      console.error("Error minting lot")
    }
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-800 dark:text-green-400 mb-4">
          🌾 Panel del Productor
        </h1>
        <p className="text-xl text-green-600 dark:text-green-300">
          Registro y gestión de cultivos y producción agrícola
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-green-200 dark:border-green-700">
          <h3 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4">📝 Registrar Nuevo Lote</h3>
          <p className="text-green-600 dark:text-green-300 mb-4">
            Crea un nuevo lote de producción con información de origen y cultivo.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
          >
            Crear Lote
          </button>

          {id && farmData && amount && (
            <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <p className="text-green-800 dark:text-green-300 font-semibold mb-2">Lote preparado para mintear:</p>
              <p className="text-sm text-green-700 dark:text-green-400">ID: {id.toString()}</p>
              <p className="text-sm text-green-700 dark:text-green-400">Producto: {farmData.product}</p>
              <p className="text-sm text-green-700 dark:text-green-400">Cantidad: {amount.toString()}</p>
              <button
                onClick={handleMintLot}
                disabled={isApprovalPending}
                className="w-full mt-3 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {isApprovalPending ? 'Mineando...' : 'Mintear Lote'}
              </button>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-green-200 dark:border-green-700">
          <h3 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4">📊 Datos IoT</h3>
          <p className="text-green-600 dark:text-green-300 mb-4">
            Visualiza y registra datos de sensores de campo.
          </p>
          <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Ver Sensores
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-green-200 dark:border-green-700">
          <h3 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4">🏆 Certificaciones</h3>
          <p className="text-green-600 dark:text-green-300 mb-4">
            Gestiona certificaciones orgánicas y de comercio justo.
          </p>
          <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Gestionar Certificados
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-green-200 dark:border-green-700">
          <h3 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4">📋 Mis Lotes</h3>
          <p className="text-green-600 dark:text-green-300 mb-4">
            Consulta y gestiona todos tus lotes registrados.
          </p>
          <button className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Ver Lotes
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-400">Crear Nuevo Lote</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ID del Lote</label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => handleInputChange('id', e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="101"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre de la Finca</label>
                <input
                  type="text"
                  value={formData.farmName}
                  onChange={(e) => handleInputChange('farmName', e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Finca San Pedro"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Producto</label>
                <input
                  type="text"
                  value={formData.product}
                  onChange={(e) => handleInputChange('product', e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Café"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Variedad</label>
                <input
                  type="text"
                  value={formData.variety}
                  onChange={(e) => handleInputChange('variety', e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Arabica Peruano"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cantidad</label>
                <input
                  type="text"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="1000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unidad</label>
                <select
                  value={formData.quantityUnit}
                  onChange={(e) => handleInputChange('quantityUnit', e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
                >
                  <option value="KG">KG</option>
                  <option value="TON">TON</option>
                  <option value="LB">LB</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
                  rows={3}
                  placeholder="Lote de 1000 KG de café Arabica de la Finca San Pedro en Cusco, Perú"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL de Imagen</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="https://www.senasa.gob.pe/senasacontigo/wp-content/uploads/2019/05/cafe-organico.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Farm NFT ID</label>
                <input
                  type="text"
                  value={formData.farmNftId}
                  onChange={(e) => handleInputChange('farmNftId', e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Harvest ID</label>
                <input
                  type="text"
                  value={formData.harvestId}
                  onChange={(e) => handleInputChange('harvestId', e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="0x..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit (hex)</label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="0x..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Unit Decimals</label>
                <input
                  type="text"
                  value={formData.unitDecimals}
                  onChange={(e) => handleInputChange('unitDecimals', e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount (para mintear)</label>
                <input
                  type="text"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="1000"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmitForm}
                className="px-6 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
              >
                Preparar Lote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}