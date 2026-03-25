export function ThemeScript() {
  const themeScript = `
    try {
      const theme = localStorage.getItem('theme-mode') || 'dark'
      if (theme === 'light') {
        document.body.classList.add('light-mode')
        document.documentElement.classList.remove('dark')
      } else {
        document.body.classList.remove('light-mode')
        document.documentElement.classList.add('dark')
      }
    } catch (e) {}
  `

  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
      suppressHydrationWarning
    />
  )
}
