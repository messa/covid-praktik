import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { Container } from 'next/app'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta charSet={`UTF-8`} />
          <meta
            name={`viewport`}
            content={`initial-scale=1.0, width=device-width`}
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Hind"
          />
          <link
            rel="shortcut icon"
            href="/static/favicon.ico"
            type="image/x-icon"
          />
          <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
        </Head>
        <body>
          <Container>
            <Main />
          </Container>
          <NextScript />
        </body>
      </html>
    )
  }
}
