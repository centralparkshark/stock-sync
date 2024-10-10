import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="navBar">
            <div className="navBar2">
                <NavLink to="/">Home</NavLink>
                <NavLink to="inventory">Inventory</NavLink>
                <NavLink to="upload">Upload</NavLink>
            </div>
            <NavLink to="tasks"><div className="gradientButton">Generate Tasks <i className=" fa fa-wand-magic-sparkles"></i></div></NavLink>
        </div>
    )
}