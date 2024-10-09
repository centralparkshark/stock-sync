import { useState } from "react"

export default function SearchBar() {
    
    const [search, setSearch] = useState("")
    
    return (
        <div className="center">
            <input type='text' placeholder='Search' onChange={(e) => setSearch(e.target.value)} value={search}/>
            <button><i className=" fa fa-search"></i></button>
        </div>
    )
}


// <div>
//                     <input type='text' placeholder='Search' onChange={(e) => searchData(e)} value={search}/>
//                     <button className=" fa fa-filter" onClick={() => setOpenFilters(!openFilters)}></button>
//                 </div>