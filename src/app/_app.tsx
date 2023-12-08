'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import AntdConfigProviderMain from 'src/styles/theme/antd-config-provider.main';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //ปิด Fetching ทั้งโปรเจค
      refetchInterval: false,
      refetchIntervalInBackground: false,
      //refetchOnMount :false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AntdConfigProviderMain>
          <Component {...pageProps} />;
        </AntdConfigProviderMain>
      </QueryClientProvider>
    </>
  );
}
