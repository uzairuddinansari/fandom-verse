import Hero from "../components/Hero";
import UpcomingEvents from "../components/Mywebsite/UpcomingEvents";
import AnimeNews from "../components/Mywebsite/AnimeNews";
import { CategoryShowcase, FeaturedShowcase, HubStrip } from "../components/fandom/HomeSections";

const Home = () => {
  return (
    <>
      <Hero />
      <HubStrip />
      <CategoryShowcase />
      <FeaturedShowcase />
      <UpcomingEvents />
      <AnimeNews />
    </>
  );
};

export default Home;
