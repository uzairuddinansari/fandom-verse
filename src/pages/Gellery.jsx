import GelleryTabs from "../components/GelleryTabs"
import ResultGrid from "../components/ResultGrid"
import SearchBar from "../components/SearchBar"

const Gellery = () => {
  return (
    <div>
      <SearchBar/>
      <GelleryTabs/>
      <ResultGrid/>
    </div>
  )
}

export default Gellery
