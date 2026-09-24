import { useDispatch, useSelector } from "react-redux";
import {fetchUnsplashData,fetchPixelsData} from "../API/GalleryAPI";
import {setLoading,seterror,setResults,clearRresult} from "../Redux/feature/SearchSlide";
import { useEffect, useState } from "react";
import "../styles/Result.css"
const ResultGrid = () => {
  const [data, setdata] = useState([]);
  const dispatch = useDispatch();
  const { query, activetab, loading, error } = useSelector((store) => store.search);

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(setLoading());
        let data = [];

        if (activetab === "photos") {
          const response = await fetchUnsplashData(query);

          data = response.data.results.map((item) => ({
            id: item.id,
            type: "photo",
            title: item.alt_description || "",
            thumbnail: item.urls.thumb,
            src: item.urls.full
          }));
        }

        if (activetab === "videos") {
          const response = await fetchPixelsData(query);

          data = response.data.videos.map((item) => ({
            id: item.id,
            type: "video",
            thumbnail: item.image,
            src: item.video_files[1]?.link || ""
          }));
        }

        setdata(data);
        dispatch(setResults(data));

      } catch (err) {
        console.error(err);
        dispatch(seterror(err.message));
      }
    };

    if (query) {
      getData();
    }
  }, [activetab, query, dispatch]);

  const SaveNow = (item) => {
  const savedImages = JSON.parse(
    localStorage.getItem("savedImages") || "[]"
  );

  savedImages.push(item);

  localStorage.setItem(
    "savedImages",
    JSON.stringify(savedImages)
  );
};





  // Loader
  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  }


  // Error
  if (error) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="rounded-lg bg-red-100 px-5 py-3 text-red-600">
          Something went wrong: {error}
        </p>
      </div>
    );
  }
  
  const ClearNow = (state) =>{
    setdata([]);
    dispatch(clearRresult())
  }

  return (
    <>

    <div className="btn_parrent">
     <button onClick={()=>
        ClearNow()
      } id="clear">
        Clear Now
      </button>
      
      </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5">
     
      {data.map((item) => (
        <div key={item.id}>
          {item.type === "photo" ? (
            <div>
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-60 object-cover rounded-lg"
              />

              <div className="des">
                {item.title}
              </div>

              <button
                onClick={() => SaveNow(item)}
                className="bg-amber-700"
              >
                Save Now
              </button>
            </div>
          ) : (
            <div className="vid_parrent">
            <video
              src={item.src}
              poster={item.thumbnail}
              controls
              className="w-full h-60 object-cover rounded-lg"
            />
            <button
                onClick={() => SaveNow(item)}
                className="bg-amber-700"
              >
                Save Now
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
    </>
  );
};

export default ResultGrid;
