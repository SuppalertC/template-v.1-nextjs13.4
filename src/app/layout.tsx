'use client';
import { Kanit } from 'next/font/google';
import { ReactElement, Suspense } from 'react';
import AntdConfigProviderMain from 'src/styles/theme/antd-config-provider.main';
import '../styles/css/globals.css';
import Loading from './loading';

const kanit = Kanit({
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  style: ['normal', 'italic'],
  subsets: ['thai'],
});
export interface LayoutProps {
  children: ReactElement;
}

export const metadata = {
  title: {
    template: `%s — ${'Stagging'}`,
    default: 'Unai',
  },
  description: 'SITE.description',
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={`motion-safe:scroll-smooth 2xl:text-[24px] ${kanit.variable} `}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${kanit.className} relative`}>
        <AntdConfigProviderMain>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </AntdConfigProviderMain>
      </body>
    </html>
  );
}
