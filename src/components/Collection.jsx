import { useDispatch, useSelector } from "react-redux";
import { addCollectionData , DeletCard ,Clear} from "../Redux/feature/CollectionSlice";
import { useEffect} from "react";

const Collection = () => {

  const dispatch = useDispatch();

  const { collectionData } = useSelector((store) => store.collection);
  useEffect(()=>{
  const getData = ()=>{
      const savedImages = JSON.parse(localStorage.getItem("savedImages") || "[]");

      savedImages.forEach(element => {
        dispatch(addCollectionData(element))
      });
   }
   getData()
  },[dispatch])
   
 const DeleteImg = (accept) => {
  // Redux se delete
  dispatch(DeletCard(accept.id));

  // LocalStorage se delete
  const savedImages = JSON.parse(
    localStorage.getItem("savedImages") || "[]"
  );

  const updatedImages = savedImages.filter(
    (item) => item.id !== accept.id
  );

  localStorage.setItem(
    "savedImages",
    JSON.stringify(updatedImages)
  );
};

 const clearNow = ()=>{
    dispatch(Clear())
 }


  return (
    <>
     <button className="clear"
         onClick={()=>{
           clearNow()
         }}
        >
          Clear now
        </button>
     <div>{collectionData.length === 0 ?
      <div>Your Collection is Empty</div>
      :
      <div>
        {collectionData.map((SaveItem)=>{
           return (
          <div key={SaveItem.id}>
            {SaveItem.type === "photo" ? (
              <>
                <img
                  src={SaveItem.src}
                  alt={SaveItem.title}
                  className="w-full h-60 object-cover rounded-lg"
                />

                <div className="des">{SaveItem.title}</div>

                <button
                  className="remove"
                  onClick={() => {
                    DeleteImg(SaveItem);
                  }}
                >
                  remove
                </button>
              </>
            ) : (
              <> <div className="vid_parrent">
            <video
              src={SaveItem.src}
              poster={SaveItem.thumbnail}
              controls
              className="w-full h-60 object-cover rounded-lg"
            />
             <button
                  className="remove"
                  onClick={() => {
                    DeleteImg(SaveItem);
                  }}
                >
                  remove
                </button>
            </div></>
            )}
          </div>
        );
      })}
     </div>
     }
     </div>   
     
     </>
  );
  
};

export default Collection;

