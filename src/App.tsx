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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      {/* Efeito de fundo animado */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Header com Glassmorphism */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-cyan-500/20 shadow-2xl">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-lime-500 rounded-lg blur opacity-75 animate-pulse"></div>
              <div className="relative w-10 h-10 bg-slate-950 rounded-lg flex items-center justify-center border border-cyan-500/50">
                <span className="text-lg font-black bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">⚡</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-black bg-gradient-to-r from-cyan-400 via-lime-400 to-red-400 bg-clip-text text-transparent">MIURABOY</h1>
              <p className="text-xs text-lime-400/70 font-mono">v1.0.0</p>
            </div>
          </div>
          {pwaInstallPrompt && (
            <button
              onClick={handleInstallPWA}
              className="px-3 py-2 bg-gradient-to-r from-cyan-500 to-lime-500 text-slate-950 text-xs font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
              title="Instalar app"
            >
              ⬇️ INSTALAR
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto pb-28 px-3 pt-4 relative z-10">
        {/* Hero Stats */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="backdrop-blur-md bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 text-center hover:border-cyan-500/60 transition">
            <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">💰</div>
            <div className="text-xs text-cyan-400/70 font-mono mt-1">FINANÇAS</div>
          </div>
          <div className="backdrop-blur-md bg-lime-500/10 border border-lime-500/30 rounded-lg p-3 text-center hover:border-lime-500/60 transition">
            <div className="text-2xl font-black bg-gradient-to-r from-lime-400 to-red-400 bg-clip-text text-transparent">🗺️</div>
            <div className="text-xs text-lime-400/70 font-mono mt-1">ALERTAS</div>
          </div>
          <div className="backdrop-blur-md bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center hover:border-red-500/60 transition">
            <div className="text-2xl font-black bg-gradient-to-r from-red-400 to-cyan-400 bg-clip-text text-transparent">⚙️</div>
            <div className="text-xs text-red-400/70 font-mono mt-1">CONFIG</div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-4">
          {activeTab === 'financial' && (
            <div className="backdrop-blur-md bg-slate-900/50 border border-cyan-500/20 rounded-xl p-4 shadow-2xl">
              <FinancialControl />
            </div>
          )}
          {activeTab === 'parts' && (
            <div className="backdrop-blur-md bg-slate-900/50 border border-lime-500/20 rounded-xl p-4 shadow-2xl">
              <PartsGallery />
            </div>
          )}
          {activeTab === 'consumption' && (
            <div className="backdrop-blur-md bg-slate-900/50 border border-cyan-500/20 rounded-xl p-4 shadow-2xl">
              <ConsumptionMonitor />
            </div>
          )}
          {activeTab === 'stations' && (
            <div className="backdrop-blur-md bg-slate-900/50 border border-lime-500/20 rounded-xl p-4 shadow-2xl">
              <GasStationRating />
            </div>
          )}
          {activeTab === 'alerts' && (
            <div className="backdrop-blur-md bg-slate-900/50 border border-red-500/20 rounded-xl p-4 shadow-2xl">
              <AlertsMap />
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="backdrop-blur-md bg-slate-900/50 border border-cyan-500/20 rounded-xl p-6 shadow-2xl">
                <h2 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent mb-4">⚙️ CONFIGURAÇÕES</h2>
                <TelegramConnect />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Botão flutuante para reportar alertas */}
      <AlertReporter />

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}

export default App
