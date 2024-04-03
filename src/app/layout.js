import { Inter } from 'next/font/google'
import './globals.css'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider, createTheme } from '@mantine/core';
import GlobalClientSideLayout from '@/components/globalClientsideLayout';

const APP_NAME = "GestureCom";
const APP_DEFAULT_TITLE = "GestureCom";
const APP_TITLE_TEMPLATE = "%s";
const APP_DESCRIPTION = "Helping communication";

export const metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

const inter = Inter({ subsets: ['latin'] })

const theme = createTheme({
  /** Put your mantine theme override here */
  colors: {
    primary: [
      "#e1f9ff",
      "#ccedff",
      "#9ad7ff",
      "#64c1ff",
      "#3baefe",
      "#20a2fe",
      "#099cff",
      "#0088e4",
      "#0078cd",
      "#0069b6"
    ]
  },
  primaryColor: "primary",
  primaryShade: 6
});

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content='#1995ef'/>
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <GlobalClientSideLayout>{children}</GlobalClientSideLayout>
        </MantineProvider>
      </body>
    </html>
  )
}
