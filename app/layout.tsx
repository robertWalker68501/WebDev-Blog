import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Footer, Navbar } from '@/components/layout';

import { ThemeProvider } from 'next-themes';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'WebDevBlog',
  description: 'A blog about web development',
  icons: {
    icon: '/assets/images/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body
        className={cn(
          'flex min-h-screen flex-col px-2 antialiased',
          poppins.variable
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className='flex-grow'>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
