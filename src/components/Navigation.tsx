type Tab = 'financial' | 'parts' | 'consumption' | 'stations'

interface NavigationProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'financial', label: 'Finanças', icon: '💰' },
    { id: 'parts', label: 'Peças', icon: '🔧' },
    { id: 'consumption', label: 'Consumo', icon: '⛽' },
    { id: 'stations', label: 'Postos', icon: '🏪' }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-blue-100 shadow-2xl max-w-md mx-auto">
      <div className="flex items-center justify-around h-20 px-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full gap-1 rounded-lg transition-all duration-300 ${
              activeTab === tab.id
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="text-2xl">{tab.icon}</span>
            <span className="text-xs font-semibold">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
