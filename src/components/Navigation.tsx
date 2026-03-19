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
