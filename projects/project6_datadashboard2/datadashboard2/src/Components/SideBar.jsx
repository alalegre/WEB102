import { Link, Outlet } from "react-router-dom";
import "../ComponentStyles/SideBar.css";

const SideBar = () => {
    return (
        <div className="Layout">
            <div className="SideBar">
                <div className="Header">
                    <h2>WeatherHub</h2>
                </div>
                <div className="Menu">
                    <ul>
                        <li className="Menu-item">
                            <Link to="/"><h2>Dashboard</h2></Link>
                        </li>
                        <li className="Menu-item">
                            <Link to="/search"><h2>Search</h2></Link>
                        </li>
                        <li className="Menu-item">
                            <Link to="/about"><h2>About</h2></Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* This is where nested routes like <App /> and <DetailView /> show */}
            <div className="MainContent">
                <Outlet />
            </div>
        </div>
    );
}

export default SideBar;
