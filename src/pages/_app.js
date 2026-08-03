import "@/styles/globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['100','300','400','500','700','900'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={roboto.className}>
      <GoogleTagManager gtmId='GTM-P6CGMR2' />
      <Component {...pageProps} />
    </main>
  );
}
