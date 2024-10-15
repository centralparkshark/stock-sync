import { useNavigate } from "react-router-dom";
import { useState } from "react"

export default function Item(props) {    
    let isSynced = false;

    let sku = props.sku.replace(/^0+/, '') // replace leading zeros to match skus
    
    // // check if shopify data already has sku
    // let match = shopifyData.find(item => item.sku === sku)
    // if (match) {
    //     // handling of some kind to make sure it actually matches
    //     // ideally check price and quantity
    //     // console.log(match)
    //     isSynced = true;
    // } 

    const navigate = useNavigate();
    function handleRowClick(sku) {
        navigate(`/inventory/${sku}`)

    }

    const [synced, setSynced] = useState(isSynced)

    
    return (
        <tr className="item" onClick={() => handleRowClick(sku)}>
            <td>{props.title}</td>
            <td>{props.stock}</td>
            <td>
                {!synced && <div className="status shopify">Not Synced</div>}
                {/* {<div className="status cycle">Uncounted</div>} */}
                {props.stock < 5 && <div className="status lowStock">Low Stock</div>}
            </td>
        </tr>
    )
}
