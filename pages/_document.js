import { Html, Head, Main, NextScript } from 'next/document'
import Navbar from '../components/Navbar'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="d-flex">
        <Navbar/>
        <div className="content">
          <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  )
}
