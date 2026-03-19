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
