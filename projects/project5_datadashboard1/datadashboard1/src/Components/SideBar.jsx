import "../ComponentStyles/SideBar.css";

const SideBar = () => {
    return (
        <div className="SideBar">
            <div className="Header">
                <h2>WeatherHub</h2>
            </div>
            <div className="Menu">
                <ul>
                    <li className="Menu-item">
                        <a href="/">
                            <h2>Dashboard</h2>
                        </a>
                    </li>
                    <li className="Menu-item">
                        <a href="/">
                            <h2>Search</h2>
                        </a>
                    </li>
                    <li className="Menu-item">
                        <a href="/">
                            <h2>About</h2>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SideBar;