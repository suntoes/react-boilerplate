import { DarkModeSwitch } from 'react-toggle-dark-mode'

import { useThemeContext } from 'components/reusable'

const sunColor = '#000'
const moonColor = '#fff'

export { ToggleThemeButton, type ToggleThemeButtonProps }

interface ToggleThemeButtonProps {}

function ToggleThemeButton() {
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
      {...{ sunColor, moonColor }}
    />
  )
}
