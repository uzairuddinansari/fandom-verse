import { useState } from "react"
import {useDispatch} from "react-redux"
import { setQuery } from "../Redux/feature/SearchSlide"

const SearchBar = () => {
 const [search, setsearch] = useState('')
  const dispatch = useDispatch()

 const formHandler = (e)=>{
    e.preventDefault()
    
   dispatch(setQuery(search))

   setsearch("")

  }

  return (
   <div className="flex items-center bg-gray-100 p-10">
  <form
    onSubmit={(e) => {
      formHandler(e);
    }}
    className="flex w-full max-w-md gap-2 rounded-xl bg-white p-4 shadow-lg"
  >
    <input
      type="text"
      value={search}
      onChange={(e) => {
        setsearch(e.target.value);
      }}
      placeholder="Search something..."
      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
    />

    <button
      type="submit"
      className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 active:scale-95"
    >
      Search
    </button>
  </form>
</div>

  )
}

export default SearchBar