import Item from './Item'
import { useEffect } from 'react'
import { useState } from 'react'

export default function ItemBoard({title, inventory, onFilter}) {

    const [data, setData] = useState(inventory)
    const [openFilters, setOpenFilters] = useState(false)
    const [filter, setFilter] = useState("")

    useEffect(() => {
        setData(inventory); 
      }, [inventory]);
    
    function filterData(e, shopName) {
        setFilter(e.target.value)
        onFilter(e.target.value, shopName)
    }

    return (
        <div className='items card'>
            <div className='titleBar'>
                <h2>{title} Inventory:</h2>
                <button onClick={() => setOpenFilters(!openFilters)}><i className=' fa fa-filter' ></i></button>
            </div>
            {openFilters && <div className="popUp">
                <label htmlFor="status">Status:</label>
                <select name="status" id="" onChange={(e) => filterData(e, title.toLowerCase())} value={filter}>
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
                {data ? data.map(item => (<Item key={item._id} {...item} ></Item>)) : "No results found."}
            </tbody>
        </table>
        </div>
    )
}