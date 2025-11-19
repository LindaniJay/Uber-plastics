// In App Router, we render meta tags directly without next/head
// This component is used in the head tag of layout.tsx
export function ViewportMeta() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="theme-color" content="#10B981" />
      <meta name="msapplication-navbutton-color" content="#10B981" />
      <meta name="apple-mobile-web-app-title" content="UberPlastics" />
      <meta name="apple-touch-fullscreen" content="yes" />
      <meta name="mobile-web-app-status-bar-style" content="black-translucent" />
    </>
  )
}



