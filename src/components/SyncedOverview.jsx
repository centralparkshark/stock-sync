import { tamData } from "../data/tam"

// these needs redone if im gonna have buth shopify and tam
export default function SyncedOverview() {
    let outOfStock = 0;
    let lowStock = 0;

    for (const item in tamData) {
        if (tamData[item].stock <= 0) {
            outOfStock++
        } else if (tamData[item].stock < 5) {
            lowStock++
        }
    }


    return (
        <div className="syncedOverview card">
            <h2 className="titleBar">Overview:</h2>
            <div>
                <div className="card">Out Of Stock: {outOfStock}</div>
                <div className="card">Low Stock: {lowStock}</div>
            </div>
        </div>
    )
}