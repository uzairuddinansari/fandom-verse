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
import Trailers from "./components/Anim/Trailers";
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
  <Route path="trailers" element={<Trailers />} />
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
            
        <Route path="/TechwizJourney" element={<TechwizJourney/>}/>
        </Routes> 
      </div>
     
      </PageTransition>
    </>
  );
}

export default App;