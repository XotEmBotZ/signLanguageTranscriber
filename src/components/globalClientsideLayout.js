'use client'
import NavBar from '@/components/NavBar'
import Head from 'next/head'
import { MantineProvider, createTheme, AppShell, Burger } from '@mantine/core';
import { Notifications } from '@mantine/notifications'
import { useDisclosure } from '@mantine/hooks';


export default function GlobalClientSideLayout({children}) {
    const [opened, { toggle, close }] = useDisclosure(false);

    return <AppShell
        header={{ height: 65 }}
        navbar={{
            width: 300,
            breakpoint: 'sm',
            collapsed: { mobile: !opened, desktop: opened },
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
}