import Preloader from '@/components/Preloader';
import Hero from '@/components/home/Hero';
import Story from '@/components/home/Story';
import FlavorRail from '@/components/home/FlavorRail';
import WaysCard from '@/components/home/WaysCard';
import Baker from '@/components/home/Baker';
import Community from '@/components/home/Community';

export default function HomePage() {
  return (
    <>
      <Preloader />
      <Hero />
      <Story />
      <FlavorRail />
      <WaysCard />
      <Baker />
      <Community />
    </>
  );
}
