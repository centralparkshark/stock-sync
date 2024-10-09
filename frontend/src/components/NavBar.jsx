import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="navBar">
            <Link to="/">Home</Link>
            <Link to="inventory">Inventory</Link>
            <Link to="upload">Upload</Link>
        </div>
    )
}