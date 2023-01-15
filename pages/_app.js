import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js'
import { useEffect } from 'react'

import '@/styles/globals.scss'

export default function App({ Component, pageProps }) {
  useEffect(()=>{
    import('bootstrap/dist/js/bootstrap.min.js');
  },[]);
  
  return <Component {...pageProps} />
}
