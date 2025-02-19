import '../styles/globals.css'; // Оставляем импорт
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="relative min-h-screen">
      <div className="animated-gradient"></div>
      <div className="relative z-10">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
