import { useState, useEffect } from 'react'
import './App.css'
import FinancialControl from './components/FinancialControl'
import PartsGallery from './components/PartsGallery'
import ConsumptionMonitor from './components/ConsumptionMonitor'
import GasStationRating from './components/GasStationRating'
import Navigation from './components/Navigation'

type Tab = 'financial' | 'parts' | 'consumption' | 'stations'

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">Miuraboy</h1>
          </div>
          {pwaInstallPrompt && (
            <button
              onClick={handleInstallPWA}
              className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition"
              title="Instalar app"
            >
              ⬇️ Instalar
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto pb-24">
        {activeTab === 'financial' && <FinancialControl />}
        {activeTab === 'parts' && <PartsGallery />}
        {activeTab === 'consumption' && <ConsumptionMonitor />}
        {activeTab === 'stations' && <GasStationRating />}
      </main>

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default App
