import '../styles/globals.css'
import { LoginWrapper } from './login';

import {useEffect}  from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import { withUAL } from "ual-reactjs-renderer";
import { useRouter } from 'next/router'


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps, router}) {

  const App = ({ ual }) => {
    // useEffect(() => {
    //   console.log(ual.activeUser === null)
    //   if ( ual.activeUser === null && router.route != "/login" ){
    //     router.push('/login');
    //   }
    // },[ual.activeUser])
    
    if ( ual.activeUser === null && router.route != "/login" ){
      return null;
    } 
    return (<Component ual={ual} {...pageProps} />)
  }

  const AppWithUAL = withUAL(App);


  return (
    <CacheProvider value={emotionCache}>
    <Head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoginWrapper>
        <AppWithUAL />
      </LoginWrapper>
    </ThemeProvider>
  </CacheProvider>
  );
}

export default MyApp
