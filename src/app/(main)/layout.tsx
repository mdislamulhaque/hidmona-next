import React from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer2 from '@/components/shared/Footer2';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer2 />
    </div>
  );
}