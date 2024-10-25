import { useNavigate } from "react-router-dom";
import { useState } from "react"

export default function Item(props) {    
    let sku = props.sku.replace(/^0+/, '') // replace leading zeros to match skus

    const navigate = useNavigate();
    function handleRowClick(sku) {
        navigate(`/inventory/${sku}`)

    }

    return (
        <tr className="item" onClick={() => handleRowClick(sku)}>
            <td>{props.title}</td>
            <td>{props.stock}</td>
            <td>
                {!props.synced && <div className="status shopify">Not Synced</div>}
                {/* {<div className="status cycle">Uncounted</div>} */}
                {props.stock < 5 && <div className="status lowStock">Low Stock</div>}
            </td>
        </tr>
    )
}
