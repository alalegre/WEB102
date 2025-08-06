import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './NavBar.css';

const NavBar = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/?search=${encodeURIComponent(search.trim())}`);
            setSearch('');
        }
    };

    return (
        <div className="NavBar">
            <div className="left-side">
                <Link to="/" className="logo">Learnivity</Link>
            </div>

            <form className="search-bar" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>

            <div className="right-side">
                <Link to="/">Home</Link>
                <Link to="/create">Create Post</Link>
            </div>
        </div>

    );
};

export default NavBar;
