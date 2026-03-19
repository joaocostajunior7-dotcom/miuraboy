import { useState, useEffect } from 'react'

interface GasStation {
  id: string
  name: string
  location: string
  rating: number
  reviews: number
  pricePerLiter: number
  lastUpdate: string
  comments: string[]
}

const INITIAL_STATIONS: GasStation[] = [
  {
    id: '1',
    name: 'Posto Shell',
    location: 'Av. Paulista, 1000 - São Paulo',
    rating: 4.5,
    reviews: 24,
    pricePerLiter: 6.29,
    lastUpdate: '2024-03-19',
    comments: ['Ótima qualidade', 'Atendimento rápido', 'Preço justo']
  },
  {
    id: '2',
    name: 'Posto Ipiranga',
    location: 'Rua Augusta, 500 - São Paulo',
    rating: 4.2,
    reviews: 18,
    pricePerLiter: 6.19,
    lastUpdate: '2024-03-19',
    comments: ['Combustível bom', 'Fila rápida', 'Preço competitivo']
  },
  {
    id: '3',
    name: 'Posto BR',
    location: 'Av. Brasil, 2000 - São Paulo',
    rating: 3.8,
    reviews: 12,
    pricePerLiter: 6.39,
    lastUpdate: '2024-03-18',
    comments: ['Atendimento lento', 'Combustível OK', 'Preço alto']
  }
]

export default function GasStationRating() {
  const [stations, setStations] = useState<GasStation[]>(INITIAL_STATIONS)
  const [newStation, setNewStation] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newRating, setNewRating] = useState('5')
  const [newComment, setNewComment] = useState('')
  const [sortBy, setSortBy] = useState<'rating' | 'price'>('rating')

  useEffect(() => {
    const saved = localStorage.getItem('miuraboy_stations')
    if (saved) {
      setStations(JSON.parse(saved))
    }
  }, [])

  const addStation = () => {
    if (!newStation || !newLocation || !newPrice) {
      alert('Preencha todos os campos')
      return
    }

    const station: GasStation = {
      id: Date.now().toString(),
      name: newStation,
      location: newLocation,
      rating: parseFloat(newRating),
      reviews: 1,
      pricePerLiter: parseFloat(newPrice),
      lastUpdate: new Date().toISOString().split('T')[0],
      comments: newComment ? [newComment] : []
    }

    const updated = [...stations, station]
    setStations(updated)
    localStorage.setItem('miuraboy_stations', JSON.stringify(updated))

    setNewStation('')
    setNewLocation('')
    setNewPrice('')
    setNewRating('5')
    setNewComment('')
  }

  const addComment = (stationId: string, comment: string) => {
    if (!comment.trim()) return

    const updated = stations.map(s => {
      if (s.id === stationId) {
        return {
          ...s,
          comments: [comment, ...s.comments].slice(0, 5),
          reviews: s.reviews + 1,
          lastUpdate: new Date().toISOString().split('T')[0]
        }
      }
      return s
    })

    setStations(updated)
    localStorage.setItem('miuraboy_stations', JSON.stringify(updated))
  }

  const deleteStation = (id: string) => {
    const updated = stations.filter(s => s.id !== id)
    setStations(updated)
    localStorage.setItem('miuraboy_stations', JSON.stringify(updated))
  }

  const sortedStations = [...stations].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating
    } else {
      return a.pricePerLiter - b.pricePerLiter
    }
  })

  const renderStars = (rating: number) => {
    return '⭐'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating))
  }

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Sort Options */}
      <div className="flex gap-2">
        <button
          onClick={() => setSortBy('rating')}
          className={`flex-1 py-2 rounded-lg font-medium transition ${
            sortBy === 'rating'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          ⭐ Melhor avaliados
        </button>
        <button
          onClick={() => setSortBy('price')}
          className={`flex-1 py-2 rounded-lg font-medium transition ${
            sortBy === 'price'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          💰 Mais baratos
        </button>
      </div>

      {/* Add New Station */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Avaliar novo posto</h3>
        
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Nome do posto"
            value={newStation}
            onChange={(e) => setNewStation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <input
            type="text"
            placeholder="Localização (rua, número)"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <input
            type="number"
            placeholder="Preço por litro (R$)"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <div>
            <label className="text-sm text-gray-700 dark:text-gray-300 block mb-2">Avaliação</label>
            <select
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="5">⭐⭐⭐⭐⭐ Excelente</option>
              <option value="4">⭐⭐⭐⭐ Muito bom</option>
              <option value="3">⭐⭐⭐ Bom</option>
              <option value="2">⭐⭐ Ruim</option>
              <option value="1">⭐ Péssimo</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Comentário (opcional)"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <button
            onClick={addStation}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Adicionar avaliação
          </button>
        </div>
      </div>

      {/* Stations List */}
      <div className="space-y-3">
        {sortedStations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">Nenhum posto avaliado ainda</p>
          </div>
        ) : (
          sortedStations.map(station => (
            <div key={station.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">{station.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">📍 {station.location}</p>
                </div>
                <button
                  onClick={() => deleteStation(station.id)}
                  className="text-red-500 hover:text-red-700 text-lg"
                >
                  ✕
                </button>
              </div>

              <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{renderStars(station.rating)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{station.reviews} avaliações</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-blue-600 dark:text-blue-400">R$ {station.pricePerLiter.toFixed(2)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">por litro</p>
                </div>
              </div>

              {/* Comments */}
              <div className="mb-3">
                {station.comments.length > 0 ? (
                  <div className="space-y-1 mb-2">
                    {station.comments.slice(0, 2).map((comment, idx) => (
                      <p key={idx} className="text-xs text-gray-600 dark:text-gray-400 italic">
                        💬 "{comment}"
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-2">Sem comentários ainda</p>
                )}
              </div>

              <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">Atualizado em {station.lastUpdate}</p>

              {/* Add Comment */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Adicionar comentário..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      addComment(station.id, e.currentTarget.value)
                      e.currentTarget.value = ''
                    }
                  }}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={(e) => {
                    const input = (e.currentTarget.previousElementSibling as HTMLInputElement)
                    if (input.value) {
                      addComment(station.id, input.value)
                      input.value = ''
                    }
                  }}
                  className="px-2 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                >
                  ➕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Info Box */}
      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
        <p className="text-sm text-green-900 dark:text-green-200">
          💡 <strong>Dica:</strong> Compartilhe suas avaliações com outros motoboys! Juntos economizamos mais.
        </p>
      </div>
    </div>
  )
}
