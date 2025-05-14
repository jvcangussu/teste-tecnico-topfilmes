import Footer from '@/components/footer/footer';
import './globals.css';
import { Mulish } from 'next/font/google';

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata = {
  title: 'Top Filmes',
  description: 'Os melhores filmes existentes!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={mulish.className}>
      <body>
        <div className="layout-container">
          <main className="content">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}