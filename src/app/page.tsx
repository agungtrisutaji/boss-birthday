import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Spotlight } from '@/components/Spotlight';
import { BirthdayCard } from '@/components/BirthdayCard';
import { WallOfWishes } from '@/components/WallOfWishes';
import { Footer } from '@/components/Footer';
import { TerminalEasterEgg } from '@/components/TerminalEasterEgg';
import { TechBackground } from '@/components/TechBackground';

export default function Home() {
  return (
    <main>
      <TechBackground />
      <Navbar />
      <Hero />
      <Spotlight />
      <BirthdayCard />
      <WallOfWishes />
      <Footer />
      <TerminalEasterEgg />
    </main>
  );
}
