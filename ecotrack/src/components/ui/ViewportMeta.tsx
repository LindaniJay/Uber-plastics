'use client'

import Head from 'next/head'

export function ViewportMeta() {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="theme-color" content="#1f2937" />
      <meta name="msapplication-navbutton-color" content="#1f2937" />
      <meta name="apple-mobile-web-app-title" content="Uber Plastic" />
    </Head>
  )
}



