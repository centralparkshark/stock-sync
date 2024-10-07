import Item from './Item'
import { tamData } from '../data/tam'
// import { shopifyData } from '../data/shopify'

import { useState } from 'react'

export default function ItemBoard() {

    const [search, setSearch] = useState("")
    const [data, setData] = useState(tamData)
    const [openFilters, setOpenFilters] = useState(false)
    const [filter, setFilter] = useState("")


    function filterData(e) {
        console.log(e.target.value)
        setFilter(e.target.value)
        // need to create a way to filter data (probably easier in MongoDB)
    }
    // currently only works for the title
    // BUT IT WORKS
    function searchData(e) {
        setSearch(e.target.value);
        setData(data.filter(item => item.title.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    return (
        <div className='items card'>
            <div className='titleBar'>
                <h2>Inventory:</h2>
                <div>
                    <input type='text' placeholder='Search' onChange={(e) => searchData(e)} value={search}/>
                    <button className=" fa fa-filter" onClick={() => setOpenFilters(!openFilters)}></button>
                </div>
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
                    <td>Item</td>
                    <td>Quantity</td>
                    <td>Status</td>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (<Item key={item.sku} {...item}></Item>))}
            </tbody>
        </table>
        </div>
    )
}