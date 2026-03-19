import { useState, useEffect } from 'react'

interface ConsumptionRecord {
  id: string
  date: string
  odometer: number
  liters: number
  price: number
  efficiency: number
}

export default function ConsumptionMonitor() {
  const [records, setRecords] = useState<ConsumptionRecord[]>([])
  const [odometer, setOdometer] = useState('')
  const [liters, setLiters] = useState('')
  const [price, setPrice] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    const saved = localStorage.getItem('miuraboy_consumption')
    if (saved) {
      setRecords(JSON.parse(saved))
    }
  }, [])

  const addRecord = () => {
    if (!odometer || !liters || !price) {
      alert('Preencha todos os campos')
      return
    }

    const odometerNum = parseFloat(odometer)
    const litersNum = parseFloat(liters)
    const priceNum = parseFloat(price)

    let efficiency = 0
    if (records.length > 0) {
      const lastRecord = records[records.length - 1]
      const kmDriven = odometerNum - lastRecord.odometer
      efficiency = kmDriven / litersNum
    }

    const newRecord: ConsumptionRecord = {
      id: Date.now().toString(),
      date: selectedDate,
      odometer: odometerNum,
      liters: litersNum,
      price: priceNum,
      efficiency
    }

    const updated = [...records, newRecord]
    setRecords(updated)
    localStorage.setItem('miuraboy_consumption', JSON.stringify(updated))

    setOdometer('')
    setLiters('')
    setPrice('')
  }

  const deleteRecord = (id: string) => {
    const updated = records.filter(r => r.id !== id)
    setRecords(updated)
    localStorage.setItem('miuraboy_consumption', JSON.stringify(updated))
  }

  const avgEfficiency = records.length > 0
    ? (records.reduce((sum, r) => sum + r.efficiency, 0) / records.length).toFixed(2)
    : '0.00'

  const totalSpent = records.reduce((sum, r) => sum + r.price, 0).toFixed(2)
  const totalLiters = records.reduce((sum, r) => sum + r.liters, 0).toFixed(2)
  const avgPricePerLiter = records.length > 0
    ? (parseFloat(totalSpent) / parseFloat(totalLiters)).toFixed(2)
    : '0.00'

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white shadow-lg">
          <p className="text-xs opacity-75">Eficiência média</p>
          <p className="text-2xl font-bold">{avgEfficiency} km/l</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white shadow-lg">
          <p className="text-xs opacity-75">Preço médio/litro</p>
          <p className="text-2xl font-bold">R$ {avgPricePerLiter}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white shadow-lg">
          <p className="text-xs opacity-75">Total gasto</p>
          <p className="text-2xl font-bold">R$ {totalSpent}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white shadow-lg">
          <p className="text-xs opacity-75">Total de litros</p>
          <p className="text-2xl font-bold">{totalLiters}L</p>
        </div>
      </div>

      {/* Add Record */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Registrar abastecimento</h3>
        
        <div className="space-y-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <input
            type="number"
            placeholder="Quilometragem (km)"
            value={odometer}
            onChange={(e) => setOdometer(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <input
            type="number"
            placeholder="Litros abastecidos"
            value={liters}
            onChange={(e) => setLiters(e.target.value)}
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <input
            type="number"
            placeholder="Valor gasto (R$)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <button
            onClick={addRecord}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Registrar abastecimento
          </button>
        </div>
      </div>

      {/* Consumption History */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Histórico de abastecimentos</h3>
        
        {records.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">Nenhum registro ainda</p>
        ) : (
          <div className="space-y-2">
            {[...records].reverse().map((record) => (
              <div key={record.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{record.date}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {record.odometer.toLocaleString('pt-BR')} km
                    </p>
                  </div>
                  <button
                    onClick={() => deleteRecord(record.id)}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Litros</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{record.liters.toFixed(2)}L</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Valor</p>
                    <p className="font-semibold text-gray-900 dark:text-white">R$ {record.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Eficiência</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {record.efficiency > 0 ? `${record.efficiency.toFixed(2)} km/l` : '-'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
        <p className="text-sm text-yellow-900 dark:text-yellow-200">
          💡 <strong>Dica:</strong> Monitore sua eficiência regularmente. Se cair muito, pode indicar problemas na moto!
        </p>
      </div>
    </div>
  )
}
