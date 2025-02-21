import { type PropsWithChildren } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
}
