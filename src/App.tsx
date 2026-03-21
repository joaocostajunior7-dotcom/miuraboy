import { useState, useEffect } from 'react'
import './App.css'
import Auth from './components/Auth'
import FinancialControl from './components/FinancialControl'
import PartsGallery from './components/PartsGallery'
import ConsumptionMonitor from './components/ConsumptionMonitor'
import GasStationRating from './components/GasStationRating'
import Navigation from './components/Navigation'
import AlertReporter from './components/AlertReporter'
import { useAuth } from './hooks/useAuth'

type Tab = 'financial' | 'parts' | 'consumption' | 'stations'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('financial')
  const [pwaInstallPrompt, setPwaInstallPrompt] = useState<any>(null)
  const { isAuthenticated, isLoading, login, logout } = useAuth()

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log('Service Worker registration failed:', err)
      })
    }

    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault()
      setPwaInstallPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallPWA = async () => {
    if (pwaInstallPrompt) {
      pwaInstallPrompt.prompt()
      const { outcome } = await pwaInstallPrompt.userChoice
      if (outcome === 'accepted') {
        setPwaInstallPrompt(null)
      }
    }
  }

  // Tela de carregamento
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-3xl animate-pulse">⚡</span>
          </div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  // Tela de login
  if (!isAuthenticated) {
    return <Auth onLogin={login} />
  }

  // App autenticado
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <h1 className="text-lg font-bold text-gray-900">MIURABOY</h1>
          </div>
          <div className="flex items-center gap-2">
            {pwaInstallPrompt && (
              <button
                onClick={handleInstallPWA}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition"
                title="Instalar app"
              >
                ⬇️
              </button>
            )}
            <button
              onClick={logout}
              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-lg transition"
              title="Sair"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto pb-28 px-4 pt-4">
        {activeTab === 'financial' && <FinancialControl />}
        {activeTab === 'parts' && <PartsGallery />}
        {activeTab === 'consumption' && <ConsumptionMonitor />}
        {activeTab === 'stations' && <GasStationRating />}
      </main>

      {/* Botão flutuante para reportar alertas */}
      <AlertReporter />

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default App
