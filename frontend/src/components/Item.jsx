import { useNavigate } from "react-router-dom";
import { useState } from "react"

export default function Item(props) {    
    let sku;
    if (props.sku) {
        // replace leading zeros to match skus
        sku = props.sku.replace(/^0+/, '') 
    }

    const navigate = useNavigate();
    function handleRowClick(sku) {
        navigate(`/inventory/${sku}`)

    }

    let qty = 0;
    if (props.stock)  qty = props.stock;
    else {
        for (const item in props.variants) {
            qty+= props.variants[item].inventory_quantity
        }
        // if (props.variants.length > 1) qty = `${qty} from ${props.variants.length} variants`
    }

    return (
        <tr className="item" onClick={() => handleRowClick(sku)}>
            <td>{props.title}</td>
            <td>{qty}</td>
            <td>
                {/* {!props.synced && <div className="status shopify">Not Synced</div>} */}
                {/* {<div className="status cycle">Uncounted</div>} */}
                {qty < 5 && <div className="status lowStock">Low Stock</div>}
            </td>
        </tr>
    )
}

// TODO: how to render sku? or id for navigation for shopify items
// TODO: synced status button
// TODO: cycle counting status button
// TODO: figure out variant counting tagger