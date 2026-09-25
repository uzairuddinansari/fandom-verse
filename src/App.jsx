import { Routes, Route } from "react-router-dom";
import Robot from "./components/Robot";
import Home from "./pages/Home";
import Login from "./components/Login";
import LiveVisitors from "./components/LiveVisitor";
import AddProducts from "./components/Addproducts";
import Admin from "./pages/Admin";
import VisitorTracker from "./components/VisitorTracker";
import ProtectedRoute from "./components/ProtectedRoute";
import Analytics from "./components/Analytics";
import About from "./pages/About";
import PageTransition from "./components/PageTransition";
import Performance from "./components/Performance";
import AppearanceCustomizer from "./components/AppearanceCustomizer";
import Gellery from "./pages/Gellery";
import Collection from "./components/Collection";
import DashboardHome from "./components/DashboardHome";
import InstallationGuide from "./pages/InstallationGuide";
import TechwizJourney from "./pages/TechwizJourney";
// ANIM 
import Anime from "./components/Anim/Anim";
import Gallery from "./components/Anim/Gallery";
import Article from "./components/Anim/Article";
import Video from "./components/Anim/Video";
import Audio from "./components/Anim/Audio";
import Characters from "./components/Anim/Characters";
import Events from "./components/Anim/Events";
import Merch from "./components/Anim/Merch";
import Anim_Trailers from "./components/Anim/Anim_Trailers";

// Gaming 
import Gaming from "./components/Gaming/Gaming";
import G_Gallery from "./components/Gaming/G_Gallery";
import G_Article from "./components/Gaming/G_Article";
import G_Video from "./components/Gaming/G_Video";
import G_Audio from "./components/Gaming/G_Audio";
import G_Characters from "./components/Gaming/G_Characters";
import G_Events from "./components/Gaming/G_Events";
import G_Merch from "./components/Gaming/G_Merch";
import G_Trailers from "./components/Gaming/G_Trailers";

// movies 
import Movies from "./components/Movies/Movies";
import M_Article from "./components/Movies/M_Article";
import M_Gallery from "./components/Movies/M_Gallery";
import M_Video from "./components/Movies/M_Video";
import M_Audio from "./components/Movies/M_Audio";
import M_Characters from "./components/Movies/M_Characters";
import M_Events from "./components/Movies/M_Events";
import M_Merch from "./components/Movies/M_Merch";
import M_Trailers from "./components/Movies/M_Trailers";

// TV shows 

import TV_Shows from "./components/TV_Shows/TV_Shows";
import TV_Article from "./components/TV_Shows/TV_Article.jsx";
import TV_Gallery from "./components/TV_Shows/TV_Gallery.jsx";
import TV_Video from "./components/TV_Shows/TV_Video.jsx";
import TV_Audio from "./components/TV_Shows/TV_Audio.jsx";
import TV_Characters from "./components/TV_Shows/TV_Characters.jsx";
import TV_Events from "./components/TV_Shows/TV_Events.jsx";
import TV_Merch from "./components/TV_Shows/TV_Merch.jsx";
import TV_Trailers from "./components/TV_Shows/TV_Trailers.jsx";


// K_POP

import K_Pop from "./components/K_Pop/K_Pop.jsx";
import K_Article from "./components/K_Pop/K_Article.jsx";
import K_Gallery from "./components/K_Pop/K_Gallery.jsx";
import K_Video from "./components/K_Pop/K_Video.jsx";
import K_Audio from "./components/K_Pop/K_Audio.jsx";
import K_Characters from "./components/K_Pop/K_Characters.jsx";
import K_Events from "./components/K_Pop/K_Events.jsx";
import K_Merch from "./components/K_Pop/K_Merch.jsx";
import K_Trailers from "./components/K_Pop/K_Trailers.jsx";

// comics

import Comics from "./components/Comics/Comics.jsx";
import C_Article from "./components/Comics/C_Article.jsx";
import C_Gallery from "./components/Comics/C_Gallery.jsx";
import C_Video from "./components/Comics/C_Video.jsx";
import C_Audio from "./components/Comics/C_Audio.jsx";
import C_Characters from "./components/Comics/C_Characters.jsx";
import C_Events from "./components/Comics/C_Events.jsx";
import C_Merch from "./components/Comics/C_Merch.jsx";
import C_Trailers from "./components/Comics/C_Trailers.jsx";

// Manga 
import Manga from "./components/Manga/Manga.jsx";
import Ma_Article from "./components/Manga/Ma_Article.jsx";
import Ma_Gallery from "./components/Manga/Ma_Gallery.jsx";
import Ma_Video from "./components/Manga/Ma_Video.jsx";
import Ma_Audio from "./components/Manga/Ma_Audio.jsx";
import Ma_Characters from "./components/Manga/Ma_Characters.jsx";
import Ma_Events from "./components/Manga/Ma_Events.jsx";
import Ma_Merch from "./components/Manga/Ma_Merch.jsx";
import Ma_Trailers from "./components/Manga/Ma_Trailers.jsx";

import Trailers from "./components/Trailers/Trailers.jsx";
import UpcomingTrailers from "./components/Trailers/UpcomingTrailers.jsx";
import AllTrailers from "./components/Trailers/AllTrailers.jsx";
import RecentTrailers from "./components/Trailers/RecentTrailers.jsx";

function App() {
  return (
    <>
      <PageTransition>
      {/* <Robot /> */}
      <VisitorTracker />

      <div className="website-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/Gellery" element={<Gellery />} />
          <Route path="/Collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/installation" element={<InstallationGuide />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<Admin />}>
             <Route index element={<DashboardHome />} />
              <Route path="add-products" element={<AddProducts />} />
              <Route path="live-visitors" element={<LiveVisitors />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="performance" element={<Performance />} />
              <Route path="AppearanceCustomizer" element={<AppearanceCustomizer />} />
            </Route>
          </Route> 

{/* Anim Route  */}
<Route path="/Anime" element={<Anime />}>
  <Route index element={<Article />} />
  <Route path="gallery" element={<Gallery />} />
  <Route path="videos" element={<Video />} />
  <Route path="audio" element={<Audio />} />
  <Route path="characters" element={<Characters />} />
  <Route path="Article" element={<Article />} />
  <Route path="events" element={<Events />} />
  <Route path="merch" element={<Merch />} />
  <Route path="trailer" element={<Anim_Trailers />} />
</Route>

{/* Gaming Route  */}
 <Route path="/Gaming" element={<Gaming />}>
  <Route index element={<G_Article />} />
  <Route path="gallery" element={<G_Gallery />} />
  <Route path="videos" element={<G_Video />} />
  <Route path="audio" element={<G_Audio />} />
  <Route path="characters" element={<G_Characters />} />
  <Route path="events" element={<G_Events />} />
  <Route path="merch" element={<G_Merch />} />
  <Route path="trailers" element={<G_Trailers />} />
</Route>

{/* Movies Route  */}

<Route path="/Movies" element={<Movies />}>
  <Route index element={<M_Article />} />
  <Route path="gallery" element={<M_Gallery />} />
  <Route path="videos" element={<M_Video />} />
  <Route path="audio" element={<M_Audio />} />
  <Route path="characters" element={<M_Characters />} />
  <Route path="events" element={<M_Events />} />
  <Route path="merch" element={<M_Merch />} />
  <Route path="trailers" element={<M_Trailers />} />
</Route>


{/* TV Shows  */}


<Route path="/TV_Shows" element={<TV_Shows />}>
  <Route index element={<TV_Article />} />
  <Route path="gallery" element={<TV_Gallery />} />
  <Route path="videos" element={<TV_Video />} />
  <Route path="audio" element={<TV_Audio />} />
  <Route path="characters" element={<TV_Characters />} />
  <Route path="events" element={<TV_Events />} />
  <Route path="merch" element={<TV_Merch />} />
  <Route path="trailers" element={<TV_Trailers />} />
</Route>

{/* K_POP  */}

<Route path="/K_Pop" element={<K_Pop />}>
  <Route index element={<K_Article />} />
  <Route path="gallery" element={<K_Gallery />} />
  <Route path="videos" element={<K_Video />} />
  <Route path="audio" element={<K_Audio />} />
  <Route path="characters" element={<K_Characters />} />
  <Route path="events" element={<K_Events />} />
  <Route path="merch" element={<K_Merch />} />
  <Route path="trailers" element={<K_Trailers />} />
</Route>


{/* Comics */}

<Route path="/Comics" element={<Comics />}>
  <Route index element={<C_Article />} />
  <Route path="gallery" element={<C_Gallery />} />
  <Route path="videos" element={<C_Video />} />
  <Route path="audio" element={<C_Audio />} />
  <Route path="characters" element={<C_Characters />} />
  <Route path="events" element={<C_Events />} />
  <Route path="merch" element={<C_Merch />} />
  <Route path="trailers" element={<C_Trailers />} />
</Route>

{/* manga  */}

<Route path="/Manga" element={<Manga />}>
  <Route index element={<Ma_Article />} />
  <Route path="gallery" element={<Ma_Gallery />} />
  <Route path="videos" element={<Ma_Video />} />
  <Route path="audio" element={<Ma_Audio />} />
  <Route path="characters" element={<Ma_Characters />} />
  <Route path="events" element={<Ma_Events />} />
  <Route path="merch" element={<Ma_Merch />} />
  <Route path="trailers" element={<Ma_Trailers />} />
</Route>

{/* Trailers */}

<Route path="/Trailers" element={<Trailers />}>
  <Route index element={<AllTrailers />} />
  <Route path="upcoming" element={<UpcomingTrailers />} />
  <Route path="recently-released" element={<RecentTrailers />} />
</Route>

        <Route path="/TechwizJourney" element={<TechwizJourney/>}/>
        </Routes> 
      </div>
     
      </PageTransition>
    </>
  );
}

export default App;