import Item from './Item'
import { tamData } from '../data/tam'

import { useState } from 'react'

export default function ItemBoard() {

    const [search, setSearch] = useState("")
    const [data, setData] = useState(tamData)

    // currently only works for the title
    // BUT IT WORKS
    function searchData(e) {
        setSearch(e.target.value);
        setData(tamData.filter(item => item.title.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    return (
        <div className='items card'>
            <div className='titleBar'>
                <h2>Inventory:</h2>
                <div>
                    <input type='text' placeholder='Search' onChange={(e) => searchData(e)} value={search}/>
                    <button className=" fa fa-filter"></button>
                </div>
            </div>
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