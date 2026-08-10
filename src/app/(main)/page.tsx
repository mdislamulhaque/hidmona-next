import type { Metadata } from 'next';
import Slider from '@/components/home/heroSection/Slider';
import Features from '@/components/home/Features';
import Services2 from '@/components/home/Services2';
import PromoCard from '@/components/home/PromoCard';
import CardIssue from '@/components/home/CardIssue';
import DebitCard from '@/components/home/DebitCard';

// Next.js Native Metadata API for Title & SEO
export const metadata: Metadata = {
  title: 'Hidmona | Home',
  description: 'Welcome to Hidmona Home Page',
};

export default function Home() {
  return (
    <>
      <Slider />
      <Features />
      {/* <Services /> */}
      <Services2 />
      <PromoCard />
      <CardIssue />
      <DebitCard />
    </>
  );
}