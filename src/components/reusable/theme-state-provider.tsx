import { createContext, useContext, useEffect, useState } from 'react'

export {
  ThemeStateProvider,
  useThemeContext,
  ThemeStateContext,
  type ThemeStateProviderProps
}

const lockTheme = 'light'
const defaultTheme = 'light'
const lightBg = '#fff'
const darkBg = '#000'
const lightColor = '#000'
const darkColor = '#fff'

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

function ThemeStateProvider(props: ThemeStateProviderProps) {
  const [theme, setTheme] = useState<'light' | 'dark' | undefined>(
    localStorage.theme || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    const delTheme = theme === 'dark' ? 'light' : 'dark'
    let newTheme = theme || defaultTheme
    if (lockTheme) newTheme = lockTheme

    root.classList.remove(delTheme)
    root.classList.add(newTheme)

    const html = document.getElementById('html')
    if (html) {
      html.style.color = newTheme === 'light' ? lightColor : darkColor
      html.style.backgroundColor = newTheme === 'light' ? lightBg : darkBg
    }

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
