import { useState, useEffect } from 'react'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se tem token salvo
    const token = localStorage.getItem('miuraboy_token')
    if (token) {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const login = () => {
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('miuraboy_token')
    localStorage.removeItem('miuraboy_pin_hash')
    // Limpar dados sensíveis
    localStorage.removeItem('miuraboy_transactions')
    localStorage.removeItem('miuraboy_consumption')
    localStorage.removeItem('miuraboy_ratings')
    setIsAuthenticated(false)
  }

  const isProtected = () => {
    return localStorage.getItem('miuraboy_token') !== null
  }

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    isProtected
  }
}
