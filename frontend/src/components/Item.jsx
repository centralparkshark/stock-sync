import { useNavigate } from "react-router-dom";
import { useState } from "react"

export default function Item(props) {    
    let sku;
    if (props.sku) {
        // replace leading zeros to match skus
        sku = props.sku.replace(/^0+/, '') 
    } else {
        // TODO: handle shopify items since sku isnt top level
        sku = props.variants[0].sku
    }

    const navigate = useNavigate();
    function handleRowClick(sku) {
        navigate(`/inventory/${sku}`)

    }

    
    // let qty = [];
    // if (props.stock) qty[0] = props.stock;
    // // gives total quantity for variants on shopify
    // else {
    //     for (const item in props.variants) {
    //         qty[0]+= props.variants[item].inventory_quantity
    //     }
    //     if (props.variants.length > 1) qty[1] = `${qty} from ${props.variants.length} variants`
    //     else qty[1] = qty
    // }

    return (
        <tr className="item" onClick={() => handleRowClick(sku)}>
            <td>{props.title}</td>
            {/* <td>{qty[1]}</td> */}
            <td>
                {/* {!props.synced && <div className="status shopify">Not Synced</div>} */}
                {/* {<div className="status cycle">Uncounted</div>} */}
                {/* {qty < 5 && <div className="status lowStock">Low Stock</div>} */}
            </td>
        </tr>
    )
}

// TODO: how to render sku? or id for navigation for shopify items
// TODO: synced status button
// TODO: cycle counting status button
// TODO: figure out variant counting tagger