import { useDispatch, useSelector } from "react-redux"
import { setActivetab } from "../Redux/feature/SearchSlide"
import "../styles/GelleryTabs.css"

const GelleryTabs = () => {
    const tabs = ["photos","videos"]

   const dispatch = useDispatch()
   const selector = useSelector((state)=>state.search.activetab)
    
  return (
    <div id="tab">
      {tabs.map((elem ,idx)=>{
        return <button
                className={`${(selector == elem ? 'bg-blue-400' :'bg-gray-500')}`} 
                id="tab_button"
                key={idx}
                onClick={()=>{
                    dispatch(setActivetab(elem))
                }}
        >
            {elem}
        </button>
      })}
    </div>
  )
}

export default GelleryTabs
