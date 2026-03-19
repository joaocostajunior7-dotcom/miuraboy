import { useState, useEffect } from 'react'

export default function TelegramConnect() {
  const [isConnected, setIsConnected] = useState(false)
  const [chatId, setChatId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Verificar se já está conectado
  useEffect(() => {
    const savedChatId = localStorage.getItem('telegram_chat_id')
    if (savedChatId) {
      setIsConnected(true)
      setChatId(savedChatId)
    }
  }, [])

  // Conectar com Telegram
  const handleConnect = async () => {
    setIsLoading(true)
    setMessage('')

    try {
      // Gerar um código único para o usuário
      const code = Math.random().toString(36).substring(2, 15)
      localStorage.setItem('telegram_code', code)

      // Mostrar instruções
      setMessage(`
📱 Abra o Telegram e procure por: @MiuraboyBot

Envie o comando: /start

Você receberá um código de confirmação.
      `)

      // Abrir Telegram (se disponível)
      const telegramUrl = 'https://t.me/MiuraboyBot?start=' + code
      window.open(telegramUrl, '_blank')
    } catch (error) {
      setMessage('❌ Erro ao conectar')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Desconectar
  const handleDisconnect = () => {
    localStorage.removeItem('telegram_chat_id')
    localStorage.removeItem('telegram_code')
    setIsConnected(false)
    setChatId(null)
    setMessage('✅ Desconectado do Telegram')
    setTimeout(() => setMessage(''), 3000)
  }

  // Testar conexão
  const handleTest = async () => {
    if (!chatId) return

    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'test',
          chatId,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage('✅ Mensagem de teste enviada! Verifique seu Telegram')
      } else {
        setMessage('❌ Erro ao enviar mensagem de teste')
      }
    } catch (error) {
      setMessage('❌ Erro ao testar conexão')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">🤖</span>
        <div>
          <h3 className="font-bold text-lg">Conexão Telegram</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Receba alertas em tempo real
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`}></span>
          <span className="font-bold">
            {isConnected ? '🟢 Conectado' : '🔴 Desconectado'}
          </span>
        </div>
        {chatId && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Chat ID: {chatId}
          </p>
        )}
      </div>

      {/* Mensagem */}
      {message && (
        <div className={`mb-4 p-3 rounded-lg text-sm whitespace-pre-wrap ${
          message.includes('✅')
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
            : message.includes('❌')
            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
        }`}>
          {message}
        </div>
      )}

      {/* Botões */}
      <div className="flex gap-2">
        {!isConnected ? (
          <button
            onClick={handleConnect}
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all disabled:opacity-50 active:scale-95"
          >
            {isLoading ? '⏳ Conectando...' : '🔗 Conectar com Telegram'}
          </button>
        ) : (
          <>
            <button
              onClick={handleTest}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-all disabled:opacity-50 active:scale-95"
            >
              {isLoading ? '⏳ Testando...' : '✉️ Testar Conexão'}
            </button>
            <button
              onClick={handleDisconnect}
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-all active:scale-95"
            >
              🔌 Desconectar
            </button>
          </>
        )}
      </div>

      {/* Instruções */}
      <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-sm text-amber-800 dark:text-amber-100">
        <p className="font-bold mb-2">📋 Como usar:</p>
        <ol className="list-decimal list-inside space-y-1 text-xs">
          <li>Clique em "Conectar com Telegram"</li>
          <li>Abra o Telegram e inicie o bot</li>
          <li>Você receberá alertas em tempo real</li>
          <li>Use "Testar Conexão" para verificar</li>
        </ol>
      </div>
    </div>
  )
}
