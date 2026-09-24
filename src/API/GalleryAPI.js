import axios from "axios";

const Unsplash_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const Pixels_KEY = import.meta.env.VITE_PIXELS_KEY;

export async function fetchUnsplashData(query,page=1,per_page=20){
  const unsplashData = await axios.get("https://api.unsplash.com/search/photos",{
    params:{query,page,per_page},
    headers:{Authorization:`Client-ID ${Unsplash_KEY}`}
  })
  return unsplashData
  
}
export async function fetchPixelsData(query,per_page=20){
  const Videos = await axios.get("https://api.pexels.com/videos/search",{
    params:{query,per_page},
    headers:{Authorization:Pixels_KEY}
  })

  return Videos
}
