import Script from "next/script";

// 환경변수 형식 검증 (인라인 JS 인젝션 방지)
const RAW_GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const RAW_CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
const GA_ID = RAW_GA_ID && /^G-[A-Z0-9]+$/.test(RAW_GA_ID) ? RAW_GA_ID : null;
const CLARITY_ID = RAW_CLARITY_ID && /^[a-z0-9]+$/i.test(RAW_CLARITY_ID) ? RAW_CLARITY_ID : null;
const NAVER_VERIFICATION = process.env.NEXT_PUBLIC_NAVER_VERIFICATION;

export function GoogleAnalytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

export function MicrosoftClarity() {
  if (!CLARITY_ID) return null;
  return (
    <Script id="clarity-init" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window,document,"clarity","script","${CLARITY_ID}");
      `}
    </Script>
  );
}

export function NaverVerification() {
  if (!NAVER_VERIFICATION) return null;
  return (
    <meta
      name="naver-site-verification"
      content={NAVER_VERIFICATION}
    />
  );
}
