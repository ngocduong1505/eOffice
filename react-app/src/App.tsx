import { NavigationProvider } from '@/hooks/useNavigation'
import AppShell from '@/components/AppShell'

export default function App() {
  return (
    <NavigationProvider>
      <AppShell />
    </NavigationProvider>
  )
}
