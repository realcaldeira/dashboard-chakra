import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { theme } from '../styles/theme';
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';
import { AuthProvider } from '../context/AuthContext';

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps ) {
  return (
    <QueryClientProvider client={queryClient} >
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <SidebarDrawerProvider>
            <Component {...pageProps}/>
          </SidebarDrawerProvider>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
