// src/components/Sidebar.jsx
import { Link } from 'react-router-dom'
import './SideBar.css'

function Sidebar() {
    return (
        <div className="sidebar">
            <h2>Crewmates</h2>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/create">Create</Link></li>
                    <li><Link to="/summary">Summary</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar
