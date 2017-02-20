import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const props = await Document.getInitialProps(ctx)
    return { ...props }
  }

  render () {
    return (
      <html>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <script src='//cdn.jsdelivr.net/g/jquery@2,underscorejs' />
          <link rel='stylesheet' href='//cdn.jsdelivr.net/g/bootswatch(cosmo/bootstrap.min.css)' />
          <style jsx>{`
            body {
              margin: 10px;
              font-family: sans-serif;
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
