import { NavigationProvider } from '@/hooks/useNavigation'
import { CurrentUserProvider } from '@/hooks/useCurrentUser'
import AppShell from '@/components/AppShell'

export default function App() {
  return (
    <CurrentUserProvider>
      <NavigationProvider>
        <AppShell />
      </NavigationProvider>
    </CurrentUserProvider>
  )
}
