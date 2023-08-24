import '../styles/globals.css';
import { Fragment } from 'react';
import NavBar from '../components/ui/nav';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <DefaultSeo
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/chronicle-mobile.svg',
          },
          {
            rel: 'apple-touch-icon',
            href: '/chronicle-mobile.svg',
            sizes: '205x77',
          }
        ]}
        openGraph={{
          type: 'website',
          locale: 'en_AU',
          url: 'https://www.waterfordchronicle.com/',
          site_name: 'The Waterford Chronicle',
          description: 'Your favourite student newspaper, now avaible online!',
          images: [
            {
              url: 'https://www.waterfordchronicle.com/chronicle-mobile.svg',
              alt: "The Waterford Chronicle's Logo",
              width: 410,
              height: 154,
            },
          ],
        }}
      />
      <SessionProvider session={pageProps.session}>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-44SFYESZ0C" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive" dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
        
            gtag('config', 'G-44SFYESZ0C', {
              page_path: window.location.pathname,
            });
          ` }} />
        <NavBar />
        <Component {...pageProps} />
        <footer><p>*Dev Build</p></footer>
      </SessionProvider>
    </Fragment>
  );
}

export default MyApp;
