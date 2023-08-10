import { DarkModeSwitch } from 'react-toggle-dark-mode'

import { useThemeContext } from 'components/theme-state-provider'

export default function ToggleThemeButton(): JSX.Element {
  const { theme, setTheme } = useThemeContext()

  const handleChange = checked => {
    setTheme(checked ? 'dark' : 'light')
  }

  return (
    <DarkModeSwitch
      checked={
        // Default to light
        // theme === 'dark'

        // Default to dark
        !theme || theme === 'dark'
      }
      onChange={handleChange}
      sunColor="#000"
      moonColor="#fff"
    />
  )
}
