import { useState } from "react"

export default function SearchBar({onSearch}) {
    const [search, setSearch] = useState('')
    
    return (
        <form className="center search" onSubmit={(e) => onSearch(e, search)}>
            <input type='text' placeholder='Search' onChange={(e) => setSearch(e.target.value)} value={search}/>
            <button type="submit"><i className=" fa fa-search"></i></button>
        </form>
    )
}
