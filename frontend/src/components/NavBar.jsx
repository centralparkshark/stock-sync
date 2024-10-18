import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="navBar">
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="inventory">Inventory</NavLink>
            <NavLink to="upload">Upload</NavLink>
        </div>
    )
}