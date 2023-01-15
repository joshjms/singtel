import { Html, Head, Main, NextScript } from 'next/document'
import Navbar from '../components/Navbar'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="d-flex" style={{backgroundColor:"#32353e"}}>
        <Navbar/>
        <div className="d-flex flex-row content">
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  )
}
