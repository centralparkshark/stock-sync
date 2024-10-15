import ItemForm from "./ItemForm"
import { useState } from "react"

export default function AddItemPopUp({setPopUpOpen}) {
    const [data, setData] = useState(null)
    

    return (
        <div className="popUpBackground center">
            <div className="popUp card">
                <div className="topRight" onClick={() => setPopUpOpen(false)}><i className=" fa fa-close fa-2x"></i></div>
                {!data && <>
                    <button onClick={() => setData("tam")}>Import TAM Info</button>
                    <button onClick={() => setData("empty")}>Create Empty Item</button>
                </>}
                {data && <>
                    <ItemForm name="shopify"/>
                    <button>Add Item</button>
                </>}
            </div>
        </div>
    )
}