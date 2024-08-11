// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './globals.css';

export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript forceColorScheme='dark' defaultColorScheme='dark' />
      </head>
      <body>
        <MantineProvider forceColorScheme='dark' defaultColorScheme='dark' >{children}</MantineProvider>
      </body>
    </html>
  );
}