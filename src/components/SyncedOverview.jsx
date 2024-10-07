import { tamData } from "../data/tam"


export default function SyncedOverview() {
    let outOfStock = 0;
    let lowStock = 0;

    for (const item in tamData) {
        if (tamData[item].tamStock <= 0) {
            outOfStock++
        } else if (tamData[item].tamStock < 5) {
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