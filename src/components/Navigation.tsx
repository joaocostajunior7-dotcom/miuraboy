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
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-2xl max-w-md mx-auto">
      <div className="flex items-center justify-around h-20 px-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full gap-1 rounded-lg transition ${
              activeTab === tab.id
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <span className="text-2xl">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
