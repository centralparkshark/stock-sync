import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="navBar">
            <NavLink to="/">Home</NavLink>
            <NavLink to="inventory">Inventory</NavLink>
            <NavLink to="upload">Upload</NavLink>
        </div>
    )
}