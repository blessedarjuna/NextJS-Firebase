import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import AuthProvider from '@/provider/AuthProvider'
//import { AuthContext } from './context/AuthContext'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
