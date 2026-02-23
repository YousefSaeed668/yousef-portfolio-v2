import BlogsSection from "../components/BlogsSection";
import ExperienceSection from "../components/ExperienceSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import SelectedWorksSection from "../components/SelectedWorksSection";

export default function Home() {
  return (
    <main className="relative w-full">
      <Header />
      <HeroSection />
      <ExperienceSection />
      <SelectedWorksSection />
      <BlogsSection />
      <Footer />
    </main>
  );
}
