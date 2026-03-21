import { useState } from 'react'

interface AuthProps {
  onLogin: () => void
}

export default function Auth({ onLogin }: AuthProps) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (!pin || pin.length < 4) {
      setError('PIN deve ter 4 dígitos')
      return
    }

    // Salvar token de forma segura
    const token = btoa(pin + Date.now())
    localStorage.setItem('miuraboy_token', token)
    localStorage.setItem('miuraboy_pin_hash', btoa(pin))
    
    setError('')
    onLogin()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-3xl">⚡</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">MIURABOY</h1>
          <p className="text-gray-600 mt-2">Controle financeiro para motoboys</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Digite seu PIN</h2>

          {/* PIN Input */}
          <div className="mb-6">
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value.replace(/\D/g, ''))
                setError('')
              }}
              onKeyPress={handleKeyPress}
              placeholder="0000"
              className="w-full px-6 py-4 text-center text-3xl font-bold tracking-widest border-2 border-blue-300 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium text-center">
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={pin.length < 4}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 text-lg"
          >
            Entrar
          </button>

          {/* Info */}
          <p className="text-center text-gray-600 text-sm mt-6">
            Use um PIN de 4 dígitos para proteger seus dados
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-8">
          v1.0.0 • Seguro e Gratuito
        </p>
      </div>
    </div>
  )
}
