import { useState, useEffect } from 'react'
import './App.css'
import FinancialControl from './components/FinancialControl'
import PartsGallery from './components/PartsGallery'
import ConsumptionMonitor from './components/ConsumptionMonitor'
import GasStationRating from './components/GasStationRating'
import Navigation from './components/Navigation'
import AlertReporter from './components/AlertReporter'

type Tab = 'financial' | 'parts' | 'consumption' | 'stations'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('financial')
  const [pwaInstallPrompt, setPwaInstallPrompt] = useState<any>(null)

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Premium */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-blue-100 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MIURABOY</h1>
              <p className="text-xs text-blue-600 font-medium">v1.0.0</p>
            </div>
          </div>
          {pwaInstallPrompt && (
            <button
              onClick={handleInstallPWA}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition shadow-md hover:shadow-lg"
            >
              ⬇️ Instalar
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto pb-28 px-4 pt-6">
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
