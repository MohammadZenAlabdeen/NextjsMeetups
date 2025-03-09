"use client"
import { ThemeProvider } from "@mui/material"
import theme from "@/app/theme"

export function StyledTheme({children}:Readonly<{children:React.ReactNode}>){
return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}