import { useState } from "react"
import {useDispatch} from "react-redux"
import { setQuery } from "../Redux/feature/SearchSlide"
import "../styles/GallerySearch.css"

const SearchBar = () => {
 const [search, setsearch] = useState('')
  const dispatch = useDispatch()

 const formHandler = (e)=>{
    e.preventDefault()
    
   dispatch(setQuery(search))

   setsearch("")

  }

  return (
   <div className="gallery-search">
  <form
    onSubmit={(e) => {
      formHandler(e);
    }}
    className="gallery-search-form"
  >
    <input
      type="text"
      value={search}
      onChange={(e) => {
        setsearch(e.target.value);
      }}
      placeholder="Search photos and videos…"
      className="gallery-search-input"
    />

    <button
      type="submit"
      className="gallery-search-button"
    >
      Search
    </button>
  </form>
</div>

  )
}

export default SearchBar