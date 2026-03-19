# 🎨 MIURABOY - CÓDIGO-FONTE COMPLETO

## 📋 Índice de Arquivos

1. [App.tsx](#apptsx) - Componente principal
2. [Navigation.tsx](#navigationtsx) - Navegação inferior
3. [index.css](#indexcss) - Estilos globais
4. [App.css](#appcss) - Estilos do App
5. [main.tsx](#maintsx) - Ponto de entrada
6. [FinancialControl.tsx](#financialcontroltsx) - Controle financeiro
7. [PartsGallery.tsx](#partsgallerytsx) - Catálogo de peças
8. [ConsumptionMonitor.tsx](#consumptionmonitortsx) - Monitor de consumo
9. [GasStationRating.tsx](#gasstationratingtsx) - Avaliação de postos
10. [TelegramConnect.tsx](#telegramconnecttsx) - Conexão com Telegram
11. [AlertReporter.tsx](#alertreportertsx) - Reportar alertas
12. [AlertsMap.tsx](#alertsmaptsx) - Mapa de alertas

---

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

---

type Tab = 'financial' | 'parts' | 'consumption' | 'stations' | 'alerts' | 'settings'

interface NavigationProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'financial', label: 'Finanças', icon: '💰' },
    { id: 'parts', label: 'Peças', icon: '🔧' },
    { id: 'alerts', label: 'Alertas', icon: '🗺️' },
    { id: 'consumption', label: 'Consumo', icon: '⛽' },
    { id: 'stations', label: 'Postos', icon: '🏪' },
    { id: 'settings', label: 'Config', icon: '⚙️' }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-slate-950/90 border-t border-cyan-500/20 shadow-2xl max-w-md mx-auto">
      <div className="flex items-center justify-around h-20 px-2 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full gap-1 rounded-lg transition-all duration-300 min-w-fit px-2 ${
              activeTab === tab.id
                ? 'text-cyan-400 bg-gradient-to-b from-cyan-500/20 to-transparent border-t-2 border-cyan-500 shadow-lg shadow-cyan-500/30'
                : 'text-gray-400 hover:text-lime-400 hover:bg-lime-500/10'
            }`}
          >
            <span className="text-2xl">{tab.icon}</span>
            <span className="text-xs font-bold">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

---

@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

body {
  font-family: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  color: #e2e8f0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
  display: flex;
  flex-direction: column;
}

/* Prevent zoom on input focus for iOS */
input,
select,
textarea {
  font-size: 16px;
}

/* Safe area support for notch devices */
@supports (padding: max(0px)) {
  body {
    padding-left: max(0px, env(safe-area-inset-left));
    padding-right: max(0px, env(safe-area-inset-right));
    padding-top: max(0px, env(safe-area-inset-top));
    padding-bottom: max(0px, env(safe-area-inset-bottom));
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.5);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #06b6d4, #84cc16);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #06b6d4, #84cc16);
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
}

/* Animações customizadas */
@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(6, 182, 212, 0.5), inset 0 0 5px rgba(6, 182, 212, 0.1);
  }
  50% {
    box-shadow: 0 0 20px rgba(6, 182, 212, 0.8), inset 0 0 10px rgba(6, 182, 212, 0.2);
  }
}

@keyframes glow-lime {
  0%, 100% {
    box-shadow: 0 0 5px rgba(132, 204, 22, 0.5), inset 0 0 5px rgba(132, 204, 22, 0.1);
  }
  50% {
    box-shadow: 0 0 20px rgba(132, 204, 22, 0.8), inset 0 0 10px rgba(132, 204, 22, 0.2);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Componentes customizados */
.glow-cyan {
  animation: glow 3s ease-in-out infinite;
}

.glow-lime {
  animation: glow-lime 3s ease-in-out infinite;
}

.float {
  animation: float 3s ease-in-out infinite;
}

/* Glassmorphism */
.glass {
  backdrop-filter: blur(10px);
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(6, 182, 212, 0.2);
}

.glass-lime {
  backdrop-filter: blur(10px);
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(132, 204, 22, 0.2);
}

/* Botões */
.btn-primary {
  @apply px-4 py-2 bg-gradient-to-r from-cyan-500 to-lime-500 text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105;
}

.btn-secondary {
  @apply px-4 py-2 bg-gradient-to-r from-lime-500 to-red-500 text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-lime-500/50 transition-all duration-300 transform hover:scale-105;
}

.btn-danger {
  @apply px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105;
}

/* Cards */
.card {
  @apply backdrop-blur-md bg-slate-900/50 border border-cyan-500/20 rounded-xl p-4 shadow-2xl hover:border-cyan-500/50 transition-all duration-300;
}

.card-lime {
  @apply backdrop-blur-md bg-slate-900/50 border border-lime-500/20 rounded-xl p-4 shadow-2xl hover:border-lime-500/50 transition-all duration-300;
}

.card-red {
  @apply backdrop-blur-md bg-slate-900/50 border border-red-500/20 rounded-xl p-4 shadow-2xl hover:border-red-500/50 transition-all duration-300;
}

/* Inputs */
.input-field {
  @apply w-full px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300;
}

.input-field:focus {
  @apply border-cyan-400 shadow-lg shadow-cyan-500/20;
}

/* Badges */
.badge {
  @apply inline-block px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-lime-500/20 border border-cyan-500/50 rounded-full text-xs font-bold text-cyan-300;
}

.badge-lime {
  @apply inline-block px-3 py-1 bg-gradient-to-r from-lime-500/20 to-green-500/20 border border-lime-500/50 rounded-full text-xs font-bold text-lime-300;
}

.badge-red {
  @apply inline-block px-3 py-1 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/50 rounded-full text-xs font-bold text-red-300;
}

/* Text gradients */
.text-gradient-cyan {
  @apply bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent;
}

.text-gradient-lime {
  @apply bg-gradient-to-r from-lime-400 to-red-400 bg-clip-text text-transparent;
}

.text-gradient-red {
  @apply bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent;
}

/* Responsive */
@media (max-width: 640px) {
  body {
    font-size: 14px;
  }

  .card {
    @apply p-3;
  }

  .btn-primary, .btn-secondary, .btn-danger {
    @apply px-3 py-1 text-sm;
  }
}

/* Dark mode (já está ativo por padrão) */
@media (prefers-color-scheme: dark) {
  body {
    color-scheme: dark;
  }
}

---

/* App specific styles */

---

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

---

import { useState, useEffect } from 'react'

interface Transaction {
  id: string
  date: string
  type: 'income' | 'expense'
  category: string
  description: string
  amount: number
}

export default function FinancialControl() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<'income' | 'expense'>('expense')
  const [category, setCategory] = useState('combustível')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  const categories = {
    expense: ['combustível', 'manutenção', 'pneu', 'óleo', 'corrente', 'freio', 'bateria', 'outros'],
    income: ['corridas', 'bônus', 'outros']
  }

  useEffect(() => {
    const saved = localStorage.getItem('miuraboy_transactions')
    if (saved) {
      setTransactions(JSON.parse(saved))
    }
  }, [])

  const saveTransaction = () => {
    if (!description || !amount) {
      alert('Preencha todos os campos')
      return
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: selectedDate,
      type,
      category,
      description,
      amount: parseFloat(amount)
    }

    const updated = [...transactions, newTransaction]
    setTransactions(updated)
    localStorage.setItem('miuraboy_transactions', JSON.stringify(updated))

    setDescription('')
    setAmount('')
    setCategory(type === 'expense' ? 'combustível' : 'corridas')
  }

  const deleteTransaction = (id: string) => {
    const updated = transactions.filter(t => t.id !== id)
    setTransactions(updated)
    localStorage.setItem('miuraboy_transactions', JSON.stringify(updated))
  }

  const todayTransactions = transactions.filter(t => t.date === selectedDate)
  const totalIncome = todayTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = todayTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
  const balance = totalIncome - totalExpense

  const monthTransactions = transactions.filter(t => 
    t.date.startsWith(selectedDate.substring(0, 7))
  )
  const monthIncome = monthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  const monthExpense = monthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Today Summary */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
        <p className="text-sm opacity-90 mb-2">Saldo do dia</p>
        <h2 className="text-3xl font-bold mb-4">R$ {balance.toFixed(2)}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs opacity-75">Entradas</p>
            <p className="text-lg font-semibold">R$ {totalIncome.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-xs opacity-75">Saídas</p>
            <p className="text-lg font-semibold">R$ {totalExpense.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Month Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Mês</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
            <p className="text-xs text-gray-600 dark:text-gray-400">Entradas</p>
            <p className="text-lg font-bold text-green-600 dark:text-green-400">R$ {monthIncome.toFixed(2)}</p>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
            <p className="text-xs text-gray-600 dark:text-gray-400">Saídas</p>
            <p className="text-lg font-bold text-red-600 dark:text-red-400">R$ {monthExpense.toFixed(2)}</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
            <p className="text-xs text-gray-600 dark:text-gray-400">Saldo</p>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">R$ {(monthIncome - monthExpense).toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Add Transaction */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Registrar movimento</h3>
        
        <div className="space-y-3">
          <div className="flex gap-2">
            <button
              onClick={() => { setType('income'); setCategory('corridas') }}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                type === 'income'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              ⬆️ Entrada
            </button>
            <button
              onClick={() => { setType('expense'); setCategory('combustível') }}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                type === 'expense'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              ⬇️ Saída
            </button>
          </div>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          >
            {categories[type].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Descrição (ex: Gasolina Ipiranga)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <input
            type="number"
            placeholder="Valor (R$)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <button
            onClick={saveTransaction}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Registrar
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Movimentações de hoje</h3>
        
        {todayTransactions.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">Nenhuma movimentação registrada</p>
        ) : (
          <div className="space-y-2">
            {todayTransactions.map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{transaction.description}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.category}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'} R$ {transaction.amount.toFixed(2)}
                  </p>
                  <button
                    onClick={() => deleteTransaction(transaction.id)}
                    className="text-xs text-red-500 hover:text-red-700 mt-1"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

---

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

---

import { useState, useEffect } from 'react'

interface ConsumptionRecord {
  id: string
  date: string
  odometer: number
  liters: number
  price: number
  efficiency: number
}

export default function ConsumptionMonitor() {
  const [records, setRecords] = useState<ConsumptionRecord[]>([])
  const [odometer, setOdometer] = useState('')
  const [liters, setLiters] = useState('')
  const [price, setPrice] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    const saved = localStorage.getItem('miuraboy_consumption')
    if (saved) {
      setRecords(JSON.parse(saved))
    }
  }, [])

  const addRecord = () => {
    if (!odometer || !liters || !price) {
      alert('Preencha todos os campos')
      return
    }

    const odometerNum = parseFloat(odometer)
    const litersNum = parseFloat(liters)
    const priceNum = parseFloat(price)

    let efficiency = 0
    if (records.length > 0) {
      const lastRecord = records[records.length - 1]
      const kmDriven = odometerNum - lastRecord.odometer
      efficiency = kmDriven / litersNum
    }

    const newRecord: ConsumptionRecord = {
      id: Date.now().toString(),
      date: selectedDate,
      odometer: odometerNum,
      liters: litersNum,
      price: priceNum,
      efficiency
    }

    const updated = [...records, newRecord]
    setRecords(updated)
    localStorage.setItem('miuraboy_consumption', JSON.stringify(updated))

    setOdometer('')
    setLiters('')
    setPrice('')
  }

  const deleteRecord = (id: string) => {
    const updated = records.filter(r => r.id !== id)
    setRecords(updated)
    localStorage.setItem('miuraboy_consumption', JSON.stringify(updated))
  }

  const avgEfficiency = records.length > 0
    ? (records.reduce((sum, r) => sum + r.efficiency, 0) / records.length).toFixed(2)
    : '0.00'

  const totalSpent = records.reduce((sum, r) => sum + r.price, 0).toFixed(2)
  const totalLiters = records.reduce((sum, r) => sum + r.liters, 0).toFixed(2)
  const avgPricePerLiter = records.length > 0
    ? (parseFloat(totalSpent) / parseFloat(totalLiters)).toFixed(2)
    : '0.00'

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white shadow-lg">
          <p className="text-xs opacity-75">Eficiência média</p>
          <p className="text-2xl font-bold">{avgEfficiency} km/l</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white shadow-lg">
          <p className="text-xs opacity-75">Preço médio/litro</p>
          <p className="text-2xl font-bold">R$ {avgPricePerLiter}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white shadow-lg">
          <p className="text-xs opacity-75">Total gasto</p>
          <p className="text-2xl font-bold">R$ {totalSpent}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white shadow-lg">
          <p className="text-xs opacity-75">Total de litros</p>
          <p className="text-2xl font-bold">{totalLiters}L</p>
        </div>
      </div>

      {/* Add Record */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Registrar abastecimento</h3>
        
        <div className="space-y-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <input
            type="number"
            placeholder="Quilometragem (km)"
            value={odometer}
            onChange={(e) => setOdometer(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <input
            type="number"
            placeholder="Litros abastecidos"
            value={liters}
            onChange={(e) => setLiters(e.target.value)}
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <input
            type="number"
            placeholder="Valor gasto (R$)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />

          <button
            onClick={addRecord}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Registrar abastecimento
          </button>
        </div>
      </div>

      {/* Consumption History */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Histórico de abastecimentos</h3>
        
        {records.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">Nenhum registro ainda</p>
        ) : (
          <div className="space-y-2">
            {[...records].reverse().map((record) => (
              <div key={record.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{record.date}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {record.odometer.toLocaleString('pt-BR')} km
                    </p>
                  </div>
                  <button
                    onClick={() => deleteRecord(record.id)}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Litros</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{record.liters.toFixed(2)}L</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Valor</p>
                    <p className="font-semibold text-gray-900 dark:text-white">R$ {record.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Eficiência</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {record.efficiency > 0 ? `${record.efficiency.toFixed(2)} km/l` : '-'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
        <p className="text-sm text-yellow-900 dark:text-yellow-200">
          💡 <strong>Dica:</strong> Monitore sua eficiência regularmente. Se cair muito, pode indicar problemas na moto!
        </p>
      </div>
    </div>
  )
}

---

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

---

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

---

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

---

import { useState, useEffect } from 'react'

interface Alert {
  id: string
  type: 'batida' | 'buraco' | 'chuva' | 'policia' | 'acidente' | 'outro'
  location: string
  latitude: number
  longitude: number
  description: string
  severity: 'baixa' | 'media' | 'alta'
  timestamp: string
}

export default function AlertsMap() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Carregar Google Maps
  useEffect(() => {
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_KEY}`
    script.async = true
    script.defer = true
    script.onload = () => setMapLoaded(true)
    document.head.appendChild(script)
  }, [])

  // Obter localização do usuário
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error('Erro ao obter localização:', error)
          // Usar localização padrão (São Paulo)
          setUserLocation({ lat: -23.5505, lng: -46.6333 })
        }
      )
    }
  }, [])

  // Carregar alertas próximos
  useEffect(() => {
    if (!userLocation) return

    const fetchAlerts = async () => {
      try {
        const response = await fetch('/api/alerts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'nearby',
            latitude: userLocation.lat,
            longitude: userLocation.lng,
            radius: 10, // 10 km
          }),
        })

        const data = await response.json()
        if (data.success) {
          setAlerts(data.alerts || [])
        }
      } catch (error) {
        console.error('Erro ao carregar alertas:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAlerts()
    const interval = setInterval(fetchAlerts, 30000) // Atualizar a cada 30s

    return () => clearInterval(interval)
  }, [userLocation])

  // Inicializar mapa
  useEffect(() => {
    if (!mapLoaded || !userLocation) return

    const mapElement = document.getElementById('alerts-map')
    if (!mapElement) return

    const map = new (window as any).google.maps.Map(mapElement, {
      zoom: 14,
      center: { lat: userLocation.lat, lng: userLocation.lng },
      styles: [
        {
          elementType: 'geometry',
          stylers: [{ color: '#f5f5f5' }],
        },
        {
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }],
        },
      ],
    })

    // Marcador do usuário
    new (window as any).google.maps.Marker({
      position: { lat: userLocation.lat, lng: userLocation.lng },
      map,
      title: 'Sua localização',
      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    })

    // Marcadores dos alertas
    alerts.forEach((alert) => {
      const iconColor: Record<string, string> = {
        batida: 'red',
        buraco: 'orange',
        chuva: 'blue',
        policia: 'purple',
        acidente: 'yellow',
        outro: 'gray',
      }

      const marker = new (window as any).google.maps.Marker({
        position: { lat: alert.latitude, lng: alert.longitude },
        map,
        title: alert.type,
        icon: `http://maps.google.com/mapfiles/ms/icons/${iconColor[alert.type]}-dot.png`,
      })

      marker.addListener('click', () => {
        setSelectedAlert(alert)
      })
    })
  }, [mapLoaded, userLocation, alerts])

  const getAlertIcon = (type: string): string => {
    const icons: Record<string, string> = {
      batida: '💥',
      buraco: '🕳️',
      chuva: '🌧️',
      policia: '🚨',
      acidente: '⚠️',
      outro: '📍',
    }
    return icons[type] || '📍'
  }

  const getSeverityColor = (severity: string): string => {
    const colors: Record<string, string> = {
      baixa: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
      media: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
      alta: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
    }
    return colors[severity] || colors.media
  }

  return (
    <div className="space-y-4">
      {/* Mapa */}
      <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
        <div
          id="alerts-map"
          className="w-full h-96 bg-gray-100 dark:bg-gray-800"
        >
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin text-4xl mb-2">🗺️</div>
                <p className="text-gray-500 dark:text-gray-400">Carregando mapa...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Legenda */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800">
        <h3 className="font-bold mb-3">Legenda de Alertas</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-red-500">●</span>
            <span>Batida</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-500">●</span>
            <span>Buraco</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-500">●</span>
            <span>Chuva</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-500">●</span>
            <span>Polícia</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">●</span>
            <span>Acidente</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">●</span>
            <span>Outro</span>
          </div>
        </div>
      </div>

      {/* Alertas próximos */}
      <div className="space-y-3">
        <h3 className="font-bold text-lg">Alertas Próximos ({alerts.length})</h3>

        {alerts.length === 0 ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
            <p className="text-green-800 dark:text-green-100">✅ Nenhum alerta na região!</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              onClick={() => setSelectedAlert(alert)}
              className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800 cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{getAlertIcon(alert.type)}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold capitalize">{alert.type}</h4>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{alert.location}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {new Date(alert.timestamp).toLocaleTimeString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detalhes do alerta selecionado */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="w-full bg-white dark:bg-gray-900 rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Detalhes do Alerta</h2>
              <button
                onClick={() => setSelectedAlert(null)}
                className="text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{getAlertIcon(selectedAlert.type)}</span>
                <div>
                  <h3 className="text-xl font-bold capitalize">{selectedAlert.type}</h3>
                  <span className={`inline-block text-xs font-bold px-2 py-1 rounded ${getSeverityColor(selectedAlert.severity)}`}>
                    {selectedAlert.severity.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Local</p>
                  <p className="font-bold">{selectedAlert.location}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Descrição</p>
                  <p className="font-bold">{selectedAlert.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Latitude</p>
                    <p className="font-bold text-sm">{selectedAlert.latitude.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Longitude</p>
                    <p className="font-bold text-sm">{selectedAlert.longitude.toFixed(4)}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Reportado em</p>
                  <p className="font-bold">
                    {new Date(selectedAlert.timestamp).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="flex-1 px-4 py-3 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-bold hover:bg-gray-400 transition-all"
                >
                  Fechar
                </button>
                <button
                  onClick={() => {
                    // Abrir no Google Maps
                    const mapsUrl = `https://www.google.com/maps/search/${selectedAlert.latitude},${selectedAlert.longitude}`
                    window.open(mapsUrl, '_blank')
                  }}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all"
                >
                  Abrir no Maps
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

---

# 🔧 BACKEND - VERCEL FUNCTIONS

## API Endpoints

### /api/alerts.ts

import { VercelRequest, VercelResponse } from '@vercel/node';

// Interface para alertas
interface Alert {
  id: string;
  type: 'batida' | 'buraco' | 'chuva' | 'policia' | 'acidente' | 'outro';
  location: string;
  latitude?: number;
  longitude?: number;
  description: string;
  severity: 'baixa' | 'media' | 'alta';
  userId: string;
  timestamp: string;
  telegramChatId?: string;
}

// Simular banco de dados em memória (em produção, usar banco de dados real)
let alerts: Alert[] = [];

// Função para enviar mensagem via Telegram
async function sendTelegramMessage(chatId: string, message: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  
  if (!botToken) {
    console.error('TELEGRAM_BOT_TOKEN não configurado');
    return false;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Erro ao enviar mensagem Telegram:', error);
    return false;
  }
}

// Formatar mensagem de alerta
function formatAlertMessage(alert: Alert): string {
  const emojiMap: Record<string, string> = {
    batida: '💥',
    buraco: '🕳️',
    chuva: '🌧️',
    policia: '🚨',
    acidente: '⚠️',
    outro: '📍',
  };

  const severityMap: Record<string, string> = {
    baixa: '🟢 Baixa',
    media: '🟡 Média',
    alta: '🔴 Alta',
  };

  return `
${emojiMap[alert.type]} <b>ALERTA - ${alert.type.toUpperCase()}</b>

📍 <b>Local:</b> ${alert.location}
⚠️ <b>Severidade:</b> ${severityMap[alert.severity]}
📝 <b>Descrição:</b> ${alert.description}
🕐 <b>Hora:</b> ${new Date(alert.timestamp).toLocaleTimeString('pt-BR')}

⚡ <i>Cuidado ao passar por essa região!</i>
  `.trim();
}

// Handler principal da API
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Apenas POST é permitido
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { action, alert, chatId } = req.body;

  // Ação 1: Criar novo alerta
  if (action === 'create') {
    if (!alert || !alert.type || !alert.location || !alert.description) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    const newAlert: Alert = {
      id: `alert_${Date.now()}`,
      type: alert.type,
      location: alert.location,
      latitude: alert.latitude,
      longitude: alert.longitude,
      description: alert.description,
      severity: alert.severity || 'media',
      userId: alert.userId || 'anonymous',
      timestamp: new Date().toISOString(),
      telegramChatId: chatId,
    };

    alerts.push(newAlert);

    // Enviar notificação para todos os usuários inscritos
    const message = formatAlertMessage(newAlert);
    
    // Aqui você enviaria para todos os chats inscritos
    // Por enquanto, apenas retornar sucesso
    
    return res.status(201).json({
      success: true,
      alert: newAlert,
      message: 'Alerta criado com sucesso!',
    });
  }

  // Ação 2: Listar alertas recentes
  if (action === 'list') {
    const recentAlerts = alerts
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 20); // Últimos 20 alertas

    return res.status(200).json({
      success: true,
      alerts: recentAlerts,
    });
  }

  // Ação 3: Obter alertas por localização
  if (action === 'nearby') {
    const { latitude, longitude, radius = 5 } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude e longitude obrigatórias' });
    }

    // Calcular distância (fórmula simplificada)
    const nearbyAlerts = alerts.filter((a) => {
      if (!a.latitude || !a.longitude) return false;
      
      const distance = Math.sqrt(
        Math.pow(a.latitude - latitude, 2) + Math.pow(a.longitude - longitude, 2)
      );
      
      return distance < radius;
    });

    return res.status(200).json({
      success: true,
      alerts: nearbyAlerts,
    });
  }

  // Ação 4: Enviar mensagem de teste
  if (action === 'test') {
    if (!chatId) {
      return res.status(400).json({ error: 'Chat ID obrigatório' });
    }

    const testMessage = `
✅ <b>Conexão com Miuraboy estabelecida!</b>

Você receberá alertas em tempo real sobre:
💥 Batidas
🕳️ Buracos
🌧️ Chuva
🚨 Polícia
⚠️ Acidentes
📍 Outros problemas

Boa sorte na rua! 🏍️
    `.trim();

    const success = await sendTelegramMessage(chatId, testMessage);

    return res.status(200).json({
      success,
      message: success ? 'Mensagem de teste enviada!' : 'Erro ao enviar mensagem',
    });
  }

  return res.status(400).json({ error: 'Ação não reconhecida' });
}

---

### /api/telegram.ts

import { VercelRequest, VercelResponse } from '@vercel/node';

// Interface para update do Telegram
interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    from: {
      id: number;
      first_name: string;
      username?: string;
    };
    chat: {
      id: number;
      type: string;
    };
    date: number;
    text?: string;
  };
}

// Armazenar chats inscritos (em produção, usar banco de dados)
const subscribedChats = new Set<number>();

// Enviar mensagem via Telegram
async function sendMessage(chatId: number, text: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    console.error('TELEGRAM_BOT_TOKEN não configurado');
    return false;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    return false;
  }
}

// Handler do webhook
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const update: TelegramUpdate = req.body;

  // Verificar se é uma mensagem de texto
  if (!update.message || !update.message.text) {
    return res.status(200).json({ ok: true });
  }

  const chatId = update.message.chat.id;
  const text = update.message.text.toLowerCase();
  const firstName = update.message.from.first_name;

  // Comando: /start
  if (text === '/start') {
    subscribedChats.add(chatId);

    const welcomeMessage = `
🏍️ <b>Bem-vindo ao Miuraboy Bot!</b>

Olá <b>${firstName}</b>! 

Você será notificado em tempo real sobre:
💥 <b>Batidas</b> na rua
🕳️ <b>Buracos</b> e obstáculos
🌧️ <b>Chuva</b> e mau tempo
🚨 <b>Polícia</b> e blitz
⚠️ <b>Acidentes</b> e situações de risco
📍 <b>Outros problemas</b> na região

<b>Comandos disponíveis:</b>
/start - Iniciar bot
/parar - Parar de receber alertas
/ajuda - Ver ajuda
/status - Ver status de conexão

Boa sorte na rua! 🚀
    `.trim();

    await sendMessage(chatId, welcomeMessage);
    return res.status(200).json({ ok: true });
  }

  // Comando: /parar
  if (text === '/parar' || text === '/stop') {
    subscribedChats.delete(chatId);

    const stopMessage = `
👋 <b>Você foi desinscrever dos alertas!</b>

Para receber alertas novamente, use /start
    `.trim();

    await sendMessage(chatId, stopMessage);
    return res.status(200).json({ ok: true });
  }

  // Comando: /ajuda
  if (text === '/ajuda' || text === '/help') {
    const helpMessage = `
❓ <b>Como usar o Miuraboy Bot</b>

<b>1. Abra o app Miuraboy</b>
   Acesse: https://miuraboy.vercel.app

<b>2. Reporte um problema</b>
   Clique em "Reportar Alerta"
   Escolha o tipo (batida, buraco, etc)
   Descreva o local e a situação

<b>3. Receba notificações</b>
   Todos os motoboys inscritos receberão o alerta
   Você também receberá alertas de outros

<b>Tipos de alerta:</b>
💥 Batida
🕳️ Buraco
🌧️ Chuva
🚨 Polícia
⚠️ Acidente
📍 Outro

<b>Dúvidas?</b>
Envie uma mensagem ou use /status
    `.trim();

    await sendMessage(chatId, helpMessage);
    return res.status(200).json({ ok: true });
  }

  // Comando: /status
  if (text === '/status') {
    const statusMessage = `
✅ <b>Status do Bot</b>

🟢 Bot conectado e funcionando
📍 Localização: Ativo
🔔 Notificações: Ativas
👥 Inscritos: ${subscribedChats.size}

Você está recebendo alertas! 🎉
    `.trim();

    await sendMessage(chatId, statusMessage);
    return res.status(200).json({ ok: true });
  }

  // Mensagem padrão
  const defaultMessage = `
👋 Olá <b>${firstName}</b>!

Não entendi seu comando. 

Use um dos comandos abaixo:
/start - Iniciar e receber alertas
/parar - Parar de receber alertas
/ajuda - Ver instruções
/status - Ver status

Ou acesse o app: https://miuraboy.vercel.app
  `.trim();

  await sendMessage(chatId, defaultMessage);
  return res.status(200).json({ ok: true });
}

---

### /api/bot-functions.ts

import { VercelRequest, VercelResponse } from '@vercel/node';

// Interface para funções do bot
interface BotFunction {
  name: string;
  description: string;
  icon: string;
  action: string;
}

// Banco de dados simulado
interface UserProfile {
  chatId: number;
  name: string;
  moto: string;
  phone: string;
  region: string;
  reputation: number;
  alertsReported: number;
  joinedAt: string;
}

interface AlertStats {
  total: number;
  byType: Record<string, number>;
  byRegion: Record<string, number>;
  averageSeverity: string;
}

// Simular armazenamento
let userProfiles: Map<number, UserProfile> = new Map();
let alertStats: AlertStats = {
  total: 0,
  byType: {},
  byRegion: {},
  averageSeverity: 'media',
};

// ============================================
// FUNÇÃO 1: Perfil do Usuário
// ============================================
export async function getUserProfile(chatId: number): Promise<UserProfile | null> {
  return userProfiles.get(chatId) || null;
}

export async function createUserProfile(
  chatId: number,
  data: Partial<UserProfile>
): Promise<UserProfile> {
  const profile: UserProfile = {
    chatId,
    name: data.name || 'Motoboy',
    moto: data.moto || 'Não informada',
    phone: data.phone || '',
    region: data.region || 'São Paulo',
    reputation: 0,
    alertsReported: 0,
    joinedAt: new Date().toISOString(),
  };

  userProfiles.set(chatId, profile);
  return profile;
}

// ============================================
// FUNÇÃO 2: Sistema de Reputação
// ============================================
export function calculateReputation(profile: UserProfile): number {
  const baseReputation = 100;
  const pointsPerAlert = 5;
  const reputation = baseReputation + profile.alertsReported * pointsPerAlert;
  return Math.min(reputation, 1000); // Máximo 1000 pontos
}

export function getReputationBadge(reputation: number): string {
  if (reputation >= 800) return '⭐⭐⭐⭐⭐ Lendário';
  if (reputation >= 600) return '⭐⭐⭐⭐ Confiável';
  if (reputation >= 400) return '⭐⭐⭐ Bom';
  if (reputation >= 200) return '⭐⭐ Iniciante';
  return '⭐ Novo';
}

// ============================================
// FUNÇÃO 3: Estatísticas de Alertas
// ============================================
export function updateAlertStats(
  alertType: string,
  region: string,
  severity: string
): void {
  alertStats.total++;

  // Por tipo
  alertStats.byType[alertType] = (alertStats.byType[alertType] || 0) + 1;

  // Por região
  alertStats.byRegion[region] = (alertStats.byRegion[region] || 0) + 1;

  // Severidade média
  const severityMap = { baixa: 1, media: 2, alta: 3 };
  const currentAvg = severityMap[alertStats.averageSeverity as keyof typeof severityMap] || 2;
  const newAvg = (currentAvg + severityMap[severity as keyof typeof severityMap]) / 2;
  alertStats.averageSeverity = newAvg > 2.5 ? 'alta' : newAvg > 1.5 ? 'media' : 'baixa';
}

export function getAlertStats(): AlertStats {
  return alertStats;
}

// ============================================
// FUNÇÃO 4: Alertas Personalizados por Região
// ============================================
export function getRegionalAlerts(region: string, limit: number = 5): string {
  const regionAlerts = alertStats.byRegion[region] || 0;
  const topType = Object.entries(alertStats.byType)
    .sort(([, a], [, b]) => b - a)[0];

  return `
📊 <b>Alertas em ${region}</b>

Total na região: <b>${regionAlerts}</b>
Tipo mais comum: <b>${topType?.[0] || 'N/A'}</b> (${topType?.[1] || 0})
Severidade média: <b>${alertStats.averageSeverity}</b>

Fique atento! 🚨
  `.trim();
}

// ============================================
// FUNÇÃO 5: Ranking de Motoboys
// ============================================
export function getRanking(limit: number = 10): string {
  const ranking = Array.from(userProfiles.values())
    .sort((a, b) => calculateReputation(b) - calculateReputation(a))
    .slice(0, limit);

  let rankingText = '🏆 <b>TOP MOTOBOYS</b>\n\n';

  ranking.forEach((user, index) => {
    const reputation = calculateReputation(user);
    const badge = getReputationBadge(reputation);
    rankingText += `${index + 1}. <b>${user.name}</b> - ${badge}\n`;
    rankingText += `   Alertas: ${user.alertsReported} | Reputação: ${reputation}\n\n`;
  });

  return rankingText;
}

// ============================================
// FUNÇÃO 6: Dicas de Segurança
// ============================================
export function getSecurityTip(): string {
  const tips = [
    '💡 Sempre use capacete! Pode salvar sua vida.',
    '💡 Verifique pneus e freios regularmente.',
    '💡 Dirija defensivamente, antecipe problemas.',
    '💡 Use coletes refletivos à noite.',
    '💡 Mantenha distância segura de outros veículos.',
    '💡 Evite usar celular enquanto dirige.',
    '💡 Conhecer as ruas reduz acidentes.',
    '💡 Combustível de qualidade economiza dinheiro.',
    '💡 Manutenção preventiva evita surpresas.',
    '💡 Comunique-se com outros motoboys!',
  ];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  return `\n${randomTip}`;
}

// ============================================
// FUNÇÃO 7: Previsão de Tempo (Mock)
// ============================================
export async function getWeatherAlert(region: string): Promise<string> {
  // Em produção, integrar com API de tempo real
  const weatherConditions = [
    { emoji: '☀️', text: 'Ensolarado', alert: 'Cuidado com o calor!' },
    { emoji: '🌧️', text: 'Chuva', alert: 'Via molhada, reduz velocidade!' },
    { emoji: '⛈️', text: 'Tempestade', alert: 'PERIGO! Evite sair!' },
    { emoji: '🌫️', text: 'Neblina', alert: 'Baixa visibilidade, acenda farol!' },
    { emoji: '❄️', text: 'Frio', alert: 'Pista pode estar escorregadia!' },
  ];

  const random = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];

  return `
${random.emoji} <b>Tempo em ${region}</b>

Condição: ${random.text}
⚠️ ${random.alert}
  `.trim();
}

// ============================================
// FUNÇÃO 8: Histórico de Alertas do Usuário
// ============================================
export function getUserAlertHistory(chatId: number, limit: number = 5): string {
  const profile = userProfiles.get(chatId);

  if (!profile) {
    return '❌ Perfil não encontrado';
  }

  return `
📋 <b>Seus Alertas</b>

Total reportado: <b>${profile.alertsReported}</b>
Região: <b>${profile.region}</b>
Moto: <b>${profile.moto}</b>
Membro desde: <b>${new Date(profile.joinedAt).toLocaleDateString('pt-BR')}</b>

Reputação: ${getReputationBadge(calculateReputation(profile))}
  `.trim();
}

// ============================================
// FUNÇÃO 9: Notificação de Alerta Crítico
// ============================================
export function formatCriticalAlert(
  type: string,
  location: string,
  description: string,
  severity: string
): string {
  const severityEmoji = {
    baixa: '🟢',
    media: '🟡',
    alta: '🔴',
  };

  const typeEmoji: Record<string, string> = {
    batida: '💥',
    buraco: '🕳️',
    chuva: '🌧️',
    policia: '🚨',
    acidente: '⚠️',
    outro: '📍',
  };

  return `
${severityEmoji[severity]} <b>ALERTA ${severity.toUpperCase()}</b>
${typeEmoji[type] || '📍'} ${type.toUpperCase()}

📍 <b>Local:</b> ${location}
📝 <b>Descrição:</b> ${description}
🕐 <b>Hora:</b> ${new Date().toLocaleTimeString('pt-BR')}

⚡ <i>Cuidado ao passar por essa região!</i>
  `.trim();
}

// ============================================
// FUNÇÃO 10: Sistema de Notificações Inteligentes
// ============================================
export interface SmartNotification {
  type: 'alert' | 'info' | 'warning' | 'success';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
}

export function createSmartNotification(
  type: 'alert' | 'info' | 'warning' | 'success',
  title: string,
  message: string,
  priority: 'low' | 'medium' | 'high' | 'critical' = 'medium'
): SmartNotification {
  return {
    type,
    title,
    message,
    priority,
    timestamp: new Date().toISOString(),
  };
}

// ============================================
// FUNÇÃO 11: Busca de Alertas por Palavra-chave
// ============================================
export function searchAlerts(keyword: string): string {
  // Em produção, buscar em banco de dados real
  return `
🔍 <b>Resultados para: "${keyword}"</b>

Procurando em nossa base de dados...
(Funcionalidade em desenvolvimento)

Dica: Use /status para ver alertas recentes
  `.trim();
}

// ============================================
// FUNÇÃO 12: Configurações do Usuário
// ============================================
export interface UserSettings {
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  region: string;
  alertTypes: string[];
  minSeverity: 'baixa' | 'media' | 'alta';
}

export function getDefaultSettings(): UserSettings {
  return {
    notificationsEnabled: true,
    soundEnabled: true,
    region: 'São Paulo',
    alertTypes: ['batida', 'buraco', 'policia', 'acidente'],
    minSeverity: 'media',
  };
}

// ============================================
// Handler Principal
// ============================================
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { action, chatId, data } = req.body;

  try {
    switch (action) {
      case 'get-profile':
        const profile = await getUserProfile(chatId);
        return res.status(200).json({ profile });

      case 'create-profile':
        const newProfile = await createUserProfile(chatId, data);
        return res.status(201).json({ profile: newProfile });

      case 'get-reputation':
        const userProfile = await getUserProfile(chatId);
        if (!userProfile) {
          return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        const reputation = calculateReputation(userProfile);
        const badge = getReputationBadge(reputation);
        return res.status(200).json({ reputation, badge });

      case 'get-stats':
        const stats = getAlertStats();
        return res.status(200).json({ stats });

      case 'get-regional-alerts':
        const regionalAlerts = getRegionalAlerts(data.region);
        return res.status(200).json({ message: regionalAlerts });

      case 'get-ranking':
        const ranking = getRanking(data.limit || 10);
        return res.status(200).json({ message: ranking });

      case 'get-security-tip':
        const tip = getSecurityTip();
        return res.status(200).json({ message: tip });

      case 'get-weather':
        const weather = await getWeatherAlert(data.region);
        return res.status(200).json({ message: weather });

      case 'get-alert-history':
        const history = getUserAlertHistory(chatId, data.limit || 5);
        return res.status(200).json({ message: history });

      case 'search-alerts':
        const searchResults = searchAlerts(data.keyword);
        return res.status(200).json({ message: searchResults });

      default:
        return res.status(400).json({ error: 'Ação não reconhecida' });
    }
  } catch (error) {
    console.error('Erro em bot-functions:', error);
    return res.status(500).json({ error: 'Erro ao processar requisição' });
  }
}


✅ Arquivo completo criado!
