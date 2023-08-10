import { createContext, useContext, useEffect, useState } from 'react'

interface IThemeStateContext {
  theme: 'light' | 'dark' | undefined
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark' | undefined>>
}

const ThemeStateContext = createContext<IThemeStateContext | undefined>(
  undefined
)

interface ThemeStateProviderProps {
  children: React.ReactNode
}

function ThemeStateProvider(props: ThemeStateProviderProps): JSX.Element {
  const [theme, setTheme] = useState<'light' | 'dark' | undefined>(
    localStorage.theme || 'dark'
  )

  useEffect(() => {
    const root = window.document.documentElement

    const delTheme = theme === 'dark' ? 'light' : 'dark'
    const newTheme = theme || 'dark'

    root.classList.remove(delTheme)
    root.classList.add(newTheme)

    document.getElementById('html')!.style.backgroundColor =
      newTheme === 'light' ? '#fff' : '#1d1d1b'

    localStorage.setItem('theme', newTheme)
  }, [theme])

  const value: IThemeStateContext = {
    theme,
    setTheme
  }

  return (
    <ThemeStateContext.Provider value={value}>
      {props.children}
    </ThemeStateContext.Provider>
  )
}

function useThemeContext(): IThemeStateContext {
  const context = useContext<IThemeStateContext | undefined>(ThemeStateContext)
  if (!context) {
    throw new Error(
      'useThemeContext cannot be used outside of a ThemeStateProvider'
    )
  }
  return context
}

export { ThemeStateProvider, useThemeContext, ThemeStateContext }
