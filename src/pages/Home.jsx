// import HomeData from "../components/HomeData"
import Nav from "../components/Nav"
// import Reviews from "../components/Reviews"
import ShowPopup from "../components/ShowPopup"
import Mywebsite from "../components/CategoryModel"
import Hero from "../components/Hero"
import UpcomingEvents from "../components/Mywebsite/UpcomingEvents"
import AnimeNews from "../components/Mywebsite/AnimeNews"
import AnimeFooter from "../components/Mywebsite/Footer"

const Home = () => {

  return (
    <>
     <ShowPopup />
      <Nav />
      <Hero />
      {/* <HomeData />
      <Reviews/> */}
      <Mywebsite/>
      <UpcomingEvents/>
      <AnimeNews/>
      <AnimeFooter />
    </>
  )
}

export default Home
