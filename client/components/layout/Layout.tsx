import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import GlobalScripts from './GlobalScripts';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-brand-dark">
      <GlobalScripts />
      <Header />
      <main className="flex-1 font-manrope">
        <div className="h-20" aria-hidden="true" />
        {children}
      </main>
      <Footer />
    </div>
  );
}
