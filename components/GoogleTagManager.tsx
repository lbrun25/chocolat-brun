'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { COOKIE_CONSENT_EVENT, hasAnalyticsConsent } from '@/lib/cookie-consent'

const GTM_ID = 'GTM-5RCH6KRK'
const GA_ID = 'G-9RFHM24RFV'

// Charge Google Tag Manager et la balise Google Analytics (gtag) uniquement après consentement aux cookies de mesure d'audience.
export default function GoogleTagManager() {
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const update = () => setAllowed(hasAnalyticsConsent())
    update()
    window.addEventListener(COOKIE_CONSENT_EVENT, update)
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, update)
  }, [])

  if (!allowed) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
      <Script id="gtm" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
    </>
  )
}
