import { useState } from 'react'

interface Part {
  id: string
  name: string
  category: string
  model: string
  price: string
  image: string
  description: string
  link: string
}

const PARTS_DATABASE: Part[] = [
  {
    id: '1',
    name: 'Corrente 520',
    category: 'Transmissão',
    model: 'Honda CB 300 / Yamaha YZF 250',
    price: 'R$ 45 - R$ 80',
    image: '⛓️',
    description: 'Corrente de transmissão resistente e durável',
    link: 'https://www.mercadolivre.com.br'
  },
  {
    id: '2',
    name: 'Pneu Traseiro 140/70',
    category: 'Pneus',
    model: 'Honda CB 300 / Yamaha YZF 250',
    price: 'R$ 120 - R$ 200',
    image: '🛞',
    description: 'Pneu traseiro com boa aderência',
    link: 'https://www.mercadolivre.com.br'
  },
  {
    id: '3',
    name: 'Óleo Sintético 10W40',
    category: 'Lubrificantes',
    model: 'Todos os modelos',
    price: 'R$ 25 - R$ 50',
    image: '🛢️',
    description: 'Óleo de motor sintético de qualidade',
    link: 'https://www.mercadolivre.com.br'
  },
  {
    id: '4',
    name: 'Pastilha de Freio',
    category: 'Freios',
    model: 'Honda CB 300 / Yamaha YZF 250',
    price: 'R$ 60 - R$ 120',
    image: '🔴',
    description: 'Pastilha de freio com excelente desempenho',
    link: 'https://www.mercadolivre.com.br'
  },
  {
    id: '5',
    name: 'Bateria 12V 5Ah',
    category: 'Elétrico',
    model: 'Honda CB 300 / Yamaha YZF 250',
    price: 'R$ 150 - R$ 250',
    image: '🔋',
    description: 'Bateria selada de longa duração',
    link: 'https://www.mercadolivre.com.br'
  },
  {
    id: '6',
    name: 'Filtro de Ar',
    category: 'Filtros',
    model: 'Todos os modelos',
    price: 'R$ 30 - R$ 60',
    image: '💨',
    description: 'Filtro de ar para melhor desempenho',
    link: 'https://www.mercadolivre.com.br'
  },
  {
    id: '7',
    name: 'Vela de Ignição',
    category: 'Ignição',
    model: 'Todos os modelos',
    price: 'R$ 15 - R$ 35',
    image: '⚡',
    description: 'Vela de ignição de qualidade premium',
    link: 'https://www.mercadolivre.com.br'
  },
  {
    id: '8',
    name: 'Corrente do Comando',
    category: 'Motor',
    model: 'Honda CB 300 / Yamaha YZF 250',
    price: 'R$ 80 - R$ 150',
    image: '🔗',
    description: 'Corrente do comando de válvulas',
    link: 'https://www.mercadolivre.com.br'
  }
]

export default function PartsGallery() {
  const [selectedModel, setSelectedModel] = useState('Todos')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [searchTerm, setSearchTerm] = useState('')

  const models = ['Todos', 'Honda CB 300', 'Yamaha YZF 250', 'Suzuki GSX-R 150']
  const categories = ['Todos', 'Transmissão', 'Pneus', 'Lubrificantes', 'Freios', 'Elétrico', 'Filtros', 'Ignição', 'Motor']

  const filteredParts = PARTS_DATABASE.filter(part => {
    const matchModel = selectedModel === 'Todos' || part.model.includes(selectedModel)
    const matchCategory = selectedCategory === 'Todos' || part.category === selectedCategory
    const matchSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       part.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchModel && matchCategory && matchSearch
  })

  return (
    <div className="px-4 py-6 space-y-4">
      {/* Search */}
      <div className="sticky top-16 bg-white dark:bg-gray-800 -mx-4 px-4 py-3 border-b border-gray-200 dark:border-gray-700 z-40">
        <input
          type="text"
          placeholder="🔍 Buscar peça..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div>
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Modelo</label>
          <div className="flex flex-wrap gap-2">
            {models.map(model => (
              <button
                key={model}
                onClick={() => setSelectedModel(model)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                  selectedModel === model
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {model}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-2">Categoria</label>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Parts Grid */}
      <div className="grid grid-cols-1 gap-3">
        {filteredParts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">Nenhuma peça encontrada</p>
          </div>
        ) : (
          filteredParts.map(part => (
            <div key={part.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition">
              <div className="flex gap-4">
                <div className="text-4xl">{part.image}</div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">{part.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{part.category}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{part.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Modelos: {part.model}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-blue-600 dark:text-blue-400">{part.price}</p>
                    <a
                      href={part.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                    >
                      Ver ofertas
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-900 dark:text-blue-200">
          💡 <strong>Dica:</strong> Preços são aproximados. Sempre compare em múltiplas plataformas para encontrar a melhor oferta!
        </p>
      </div>
    </div>
  )
}
