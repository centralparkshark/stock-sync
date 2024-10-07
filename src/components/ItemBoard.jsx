import Item from './Item'
import { tamData } from '../data/tam'

export default function ItemBoard() {
    return (
        <div className='items card'>
            <div>
                <button className=" fa fa-filter"></button>
                <input type='text' placeholder='Search'/>
            </div>
          <table>
            <th>Title</th>
            <th>Quantity</th>
            <th>Status</th>
            {tamData.map(item => (<Item key={item.sku} {...item}></Item>))}
        </table>
        </div>
    )
}