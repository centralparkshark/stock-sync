import ItemForm from "./ItemForm"
import { useState } from "react"

export default function AddItemPopUp({setPopUpOpen, setShopifyData, tamData}) {
    const [data, setData] = useState(null)

    function importTamData() {
        let date = new Date();
        setData({
            stock: Math.floor(tamData.stock / 10),
            lastUpdate: date.toISOString(),
            ...tamData
    })
    }
    return (
        <div className="popUpBackground center">
            <div className="popUp card">
                <div className="topRight" onClick={() => setPopUpOpen(false)}><i className=" fa fa-close fa-2x"></i></div>
                {!data && <>
                    <button onClick={importTamData}>Import TAM Info</button>
                    <button onClick={() => setData({})}>Create Empty Item</button>
                </>}
                {data && <ItemForm name="shopify" editMode="true" {...data} setShopifyData={(newData) => {setShopifyData(newData)}} />}
            </div>
        </div>
    )
}