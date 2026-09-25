import { useDispatch, useSelector } from "react-redux";
import {fetchUnsplashData,fetchPixelsData} from "../API/GalleryAPI";
import {setLoading,seterror,setResults,clearRresult} from "../Redux/feature/SearchSlide";
import { useEffect, useState } from "react";
import "../styles/Result.css"
import "../styles/GallerySearch.css"
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
      <div className="gallery-status">
        <div className="gallery-spinner"></div>
      </div>
    );
  }


  // Error
  if (error) {
    return (
      <div className="gallery-status">
        <p className="gallery-error">
          Something went wrong: {error}
        </p>
      </div>
    );
  }
  
  const ClearNow = () =>{
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
    <div className="gallery-results">
     
      {data.map((item) => (
        <div key={item.id}>
          {item.type === "photo" ? (
            <div>
              <img
                src={item.src}
                alt={item.title}
                className="gallery-media"
              />

              <div className="des">
                {item.title}
              </div>

              <button
                onClick={() => SaveNow(item)}
                className="gallery-save"
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
              className="gallery-media"
            />
            <button
                onClick={() => SaveNow(item)}
                className="gallery-save"
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
