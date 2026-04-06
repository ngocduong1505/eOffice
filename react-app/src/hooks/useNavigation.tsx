import React, { createContext, useContext, useState, useCallback } from 'react'

// Map each screen ID to its sidebar group key
const SCREEN_GROUP: Record<string, string> = {
  s1: 'vb-den', s2: 'vb-den', s3: 'vb-den', s7: 'vb-den',
  s8: 'vb-di', s9: 'vb-di', s10: 'vb-di', s11: 'vb-di',
  s12: 'vb-di', s13: 'vb-di',
  s14: 'noi-bo', s15: 'noi-bo',
  s16: 'ho-so', s17: 'ho-so', s18: 'ho-so', s19: 'ho-so',
  s20: 'so-bc', s21: 'so-bc', s22: 'so-bc',
  ml1: 'mau-luong', ml2: 'mau-luong', ml3: 'mau-luong',
}

interface NavigationContextType {
  currentScreen: string
  currentGroup: string
  openGroups: Set<string>
  screenParams: Record<string, unknown>
  goScreen: (id: string, params?: Record<string, unknown>) => void
  toggleNavGroup: (group: string, defaultScreen: string) => void
  openNavGroup: (group: string) => void
}

const NavigationContext = createContext<NavigationContextType | null>(null)

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState('s1')
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set(['vb-den']))
  const [screenParams, setScreenParams] = useState<Record<string, unknown>>({})

  const currentGroup = SCREEN_GROUP[currentScreen] ?? ''

  const openNavGroup = useCallback((group: string) => {
    setOpenGroups(new Set([group]))
  }, [])

  const goScreen = useCallback((id: string, params?: Record<string, unknown>) => {
    setCurrentScreen(id)
    setScreenParams(params ?? {})
    const group = SCREEN_GROUP[id]
    if (group) {
      openNavGroup(group)
    }
  }, [openNavGroup])

  const toggleNavGroup = useCallback((group: string, defaultScreen: string) => {
    setOpenGroups(prev => {
      if (prev.has(group)) {
        const next = new Set(prev)
        next.delete(group)
        return next
      } else {
        goScreen(defaultScreen)
        return new Set([group])
      }
    })
  }, [goScreen])

  return (
    <NavigationContext.Provider value={{
      currentScreen,
      currentGroup,
      openGroups,
      screenParams,
      goScreen,
      toggleNavGroup,
      openNavGroup,
    }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const ctx = useContext(NavigationContext)
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider')
  return ctx
}
