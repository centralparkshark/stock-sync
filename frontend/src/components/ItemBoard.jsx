import Item from './Item'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import SearchBar from './SearchBar'

export default function ItemBoard({title, inventory}) {

    const [data, setData] = useState(inventory)
    const [openFilters, setOpenFilters] = useState(false)
    const [filter, setFilter] = useState("")

    useEffect(() => {
        setData(inventory); 
      }, [inventory]);

    // function filterData(e) {
    //     console.log(e.target.value)
    //     setFilter(e.target.value)
    //     // need to create a way to filter data (probably easier in MongoDB)
    // }
    // // currently only works for the title
    // // BUT IT WORKS
    // function searchData(e) {
    //     setSearch(e.target.value);
    //     setData(inventory.filter(item => item.title.toLowerCase().includes(e.target.value.toLowerCase())))
    // }

    return (
        <div className='items card'>
            <div className='titleBar'>
                <h2>{title} Inventory:</h2>
                <SearchBar />
            </div>
            {openFilters && <div className="popUp">
                <label htmlFor="status">Status:</label>
                <select name="status" id="" onChange={(e) => filterData(e)} value={filter}>
                    <option value=""></option>    
                    <option value="uncounted">Uncounted</option>    
                    <option value="unsynced">Unsynced</option>    
                    <option value="lowstock">Low Stock</option>    
                    <option value="outstock">Out Of Stock</option>    
                </select>    
            </div>}
          <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (<Item key={item._id} {...item}></Item>))}
            </tbody>
        </table>
        </div>
    )
}