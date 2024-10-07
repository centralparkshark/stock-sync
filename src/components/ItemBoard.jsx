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
            <thead>
                <tr>
                    <td>Item</td>
                    <td>Quantity</td>
                    <td>Status</td>
                </tr>
            </thead>
            <tbody>
                {tamData.map(item => (<Item key={item.sku} {...item}></Item>))}
            </tbody>
        </table>
        </div>
    )
}