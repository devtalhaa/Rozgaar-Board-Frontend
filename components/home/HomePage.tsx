import HeroSection from './HeroSection';
import SkillCategories from './SkillCategories';
import FeaturedWorkers from './FeaturedWorkers';
import HowItWorks from './HowItWorks';
import StatsCounter from './StatsCounter';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <SkillCategories />
      <FeaturedWorkers />
      <HowItWorks />
      <StatsCounter />
    </div>
  );
}
