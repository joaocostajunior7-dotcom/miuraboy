import { useState } from 'react'

interface AlertReport {
  type: 'batida' | 'buraco' | 'chuva' | 'policia' | 'acidente' | 'outro'
  location: string
  description: string
  severity: 'baixa' | 'media' | 'alta'
  latitude?: number
  longitude?: number
}

export default function AlertReporter() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<AlertReport>({
    type: 'batida',
    location: '',
    description: '',
    severity: 'media',
  })
  const [message, setMessage] = useState('')

  // Obter localização do usuário
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
          setMessage('📍 Localização capturada!')
        },
        (error) => {
          setMessage('❌ Erro ao obter localização')
          console.error(error)
        }
      )
    } else {
      setMessage('❌ Geolocalização não disponível')
    }
  }

  // Enviar alerta
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      // Obter chat ID do Telegram (armazenado no localStorage)
      const telegramChatId = localStorage.getItem('telegram_chat_id')

      if (!telegramChatId) {
        setMessage('⚠️ Conecte com o bot do Telegram primeiro!')
        setIsLoading(false)
        return
      }

      // Enviar para API
      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          alert: formData,
          chatId: telegramChatId,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('✅ Alerta enviado com sucesso!')
        // Resetar formulário
        setFormData({
          type: 'batida',
          location: '',
          description: '',
          severity: 'media',
        })
        // Fechar modal após 2 segundos
        setTimeout(() => setIsOpen(false), 2000)
      } else {
        setMessage(`❌ Erro: ${data.error}`)
      }
    } catch (error) {
      setMessage('❌ Erro ao enviar alerta')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const alertTypes = [
    { value: 'batida', label: '💥 Batida', color: 'bg-red-500' },
    { value: 'buraco', label: '🕳️ Buraco', color: 'bg-orange-500' },
    { value: 'chuva', label: '🌧️ Chuva', color: 'bg-blue-500' },
    { value: 'policia', label: '🚨 Polícia', color: 'bg-purple-500' },
    { value: 'acidente', label: '⚠️ Acidente', color: 'bg-yellow-500' },
    { value: 'outro', label: '📍 Outro', color: 'bg-gray-500' },
  ]

  const severities = [
    { value: 'baixa', label: '🟢 Baixa' },
    { value: 'media', label: '🟡 Média' },
    { value: 'alta', label: '🔴 Alta' },
  ]

  return (
    <div className="fixed bottom-24 right-4 z-40">
      {/* Botão flutuante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center text-2xl shadow-lg hover:shadow-xl transition-all active:scale-95"
        title="Reportar alerta"
      >
        🚨
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="w-full bg-white dark:bg-gray-900 rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Reportar Alerta</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tipo de alerta */}
              <div>
                <label className="block text-sm font-bold mb-3">Tipo de Alerta</label>
                <div className="grid grid-cols-2 gap-2">
                  {alertTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: type.value as any })}
                      className={`p-3 rounded-lg font-bold transition-all ${
                        formData.type === type.value
                          ? `${type.color} text-white scale-105`
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Severidade */}
              <div>
                <label className="block text-sm font-bold mb-3">Severidade</label>
                <div className="flex gap-2">
                  {severities.map((sev) => (
                    <button
                      key={sev.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, severity: sev.value as any })}
                      className={`flex-1 p-2 rounded-lg font-bold transition-all ${
                        formData.severity === sev.value
                          ? 'bg-blue-600 text-white scale-105'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {sev.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Local */}
              <div>
                <label className="block text-sm font-bold mb-2">Local</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ex: Av. Paulista, 1000"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={getLocation}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all"
                  >
                    📍
                  </button>
                </div>
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-bold mb-2">Descrição</label>
                <textarea
                  placeholder="Descreva o problema em detalhes..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                  rows={4}
                  required
                />
              </div>

              {/* Mensagem de status */}
              {message && (
                <div className={`p-3 rounded-lg font-bold ${
                  message.includes('✅')
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                }`}>
                  {message}
                </div>
              )}

              {/* Botões */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-3 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-bold hover:bg-gray-400 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Enviando...' : 'Enviar Alerta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
