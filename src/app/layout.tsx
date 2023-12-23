import StoreProvider from '@/redux/store-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';

import Init from './_components/init';

import './globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ComeOn',
  description: 'Js test',
  icons: {
    icon: '/images/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Init />
          <div className="ui one column center aligned page grid">
            <div className="column twelve wide">
              <Image className="logo" src="/images/logo.svg" alt="logo" priority={true} width={500} height={100} />
            </div>
          </div>
          <div className="main container">{children}</div>
        </StoreProvider>
      </body>
    </html>
  );
}
