import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { CookieBanner } from '@/components/site/CookieBanner';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <CookieBanner />
    </>
  );
}
