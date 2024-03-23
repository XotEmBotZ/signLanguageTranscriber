'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/NavBar'
import Head from 'next/head'
import { MantineProvider, createTheme, AppShell, Burger } from '@mantine/core';
import { Notifications } from '@mantine/notifications'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { useDisclosure } from '@mantine/hooks';
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

const theme = createTheme({
  /** Put your mantine theme override here */
  colors: {
    primary: [
      "#fff0e2",
      "#ffdfcc",
      "#ffbe9a",
      "#ff9b63",
      "#ff7d36",
      "#ff6918",
      "#ff5f06",
      "#e44f00",
      "#cb4400",
      "#b23800"
    ]
  },
  primaryColor: "primary",
  primaryShade: 6
});

export default function RootLayout({ children }) {
  const [opened, { toggle, close }] = useDisclosure(true);

  return (
    <html lang="en">
      <head>
        <title>GesutreCom</title>
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <AppShell
            header={{ height: 65 }}
            navbar={{
              width: 300,
              breakpoint: 'sm',
              collapsed: { mobile: !opened, desktop: !opened },
            }}
            padding="md"
          >
            <AppShell.Header>
              <NavBar opened={opened} toggle={toggle}></NavBar>
            </AppShell.Header>
            <AppShell.Navbar p="md">Navbar</AppShell.Navbar>
            <AppShell.Main>
              <main style={{ padding: '1rem var(--pagePadding)' }}>
                {children}
              </main>
            </AppShell.Main>
            <Notifications />
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  )
}
