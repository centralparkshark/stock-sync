import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useInventory from "../data/useInventory";

// these needs redone if im gonna have buth shopify and tam
export default function SyncedOverview() {
    const {inventory } = useInventory();
    const {tamData = [], shopifyData = []} = inventory
    const totalItems = tamData.concat(shopifyData)


    const [outOfStock, setOutOfStock] = useState(0) 
    const [lowStock, setLowStock] = useState(0) 
    const [totalInventory, setTotalInventory] = useState(0) 

    useEffect(() => {
        if (totalItems) {
            setOutOfStock(totalItems.filter(item => item.stock <= 0).length);
            setLowStock(totalItems.filter(item => item.stock <= 5).length);
            setTotalInventory(totalItems.length);
        }
    }, [totalItems]);
    
    return (
        <>
        <h2 className="titleBar">Overview:</h2>
        <div className="syncedOverview card">
            <div className="card">Alerts!</div>
            <div> 
                <div className="card">Out Of Stock: {outOfStock}</div>
                <div className="card">Low Stock: {lowStock}</div>
                <div className="card">Total Items: {totalInventory}</div>
                {/* <div className="card">Unsynced: {unsynced}</div> */}
            </div>
            <div className="center">
                <Link to="upload"><button>Upload New Data</button></Link>
            </div>
            
        </div>
        </>
    )
}

// each card should link to tasks page with pre-filtered data 
// total inventory should link to inventory