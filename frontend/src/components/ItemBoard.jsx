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

    useEffect(() => {
        if (filter == "lowstock") {
            setData(inventory.filter(item => 
                item.stock <= 5
              ))
        } else if (filter == "outstock") {
            setData(inventory.filter(item => 
                item.stock <= 0
              ))
              
        // figure out uncounted and unsynced logic
        } else if (filter == "uncounted") {
            setData(inventory.filter(item => 
                item.stock <= 0
              ))
        } else if (filter == "unsynced") {
            setData(inventory.filter(item => 
                item.stock <= 0
              ))
        }
        else {
            setData(inventory)
        }
    }, [filter])
    
    
    return (
        <div className='items card'>
            <div className='titleBar'>
                <h2>{title} Inventory:</h2>
                <button onClick={() => setOpenFilters(!openFilters)}><i className=' fa fa-filter' ></i></button>
            </div>
            {openFilters && <div className="popUp">
                <label htmlFor="status">Status:</label>
                <select name="status" id="" onChange={(e) => setFilter(e.target.value)} value={filter}>
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