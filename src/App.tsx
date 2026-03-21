import { useState, useEffect } from 'react'
import './App.css'
import FinancialControl from './components/FinancialControl'
import PartsGallery from './components/PartsGallery'
import ConsumptionMonitor from './components/ConsumptionMonitor'
import GasStationRating from './components/GasStationRating'
import Navigation from './components/Navigation'
import TelegramConnect from './components/TelegramConnect'
import AlertReporter from './components/AlertReporter'
import AlertsMap from './components/AlertsMap'

type Tab = 'financial' | 'parts' | 'consumption' | 'stations' | 'alerts' | 'settings'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('financial')
  const [pwaInstallPrompt, setPwaInstallPrompt] = useState<any>(null)

  useEffect(() => {
    // Registrar service worker para PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log('Service Worker registration failed:', err)
      })
    }

    // Capturar evento de instalação PWA
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
    <div className="min-h-screen bg-white">
      {/* Header Simples */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <h1 className="text-lg font-bold text-gray-900">MIURABOY</h1>
          </div>
          {pwaInstallPrompt && (
            <button
              onClick={handleInstallPWA}
              className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition"
              title="Instalar app"
            >
              ⬇️ Instalar
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto pb-24 px-4 pt-4">
        {activeTab === 'financial' && <FinancialControl />}
        {activeTab === 'parts' && <PartsGallery />}
        {activeTab === 'consumption' && <ConsumptionMonitor />}
        {activeTab === 'stations' && <GasStationRating />}
        {activeTab === 'alerts' && <AlertsMap />}
        {activeTab === 'settings' && (
          <div className="space-y-4 py-4">
            <h2 className="text-2xl font-bold text-gray-900">Configurações</h2>
            <TelegramConnect />
          </div>
        )}
      </main>

      {/* Botão flutuante para reportar alertas */}
      <AlertReporter />

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default App
