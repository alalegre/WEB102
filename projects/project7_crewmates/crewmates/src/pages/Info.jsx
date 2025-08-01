import { useLocation } from 'react-router-dom'
import './Info.css'
import { Link } from 'react-router-dom'

const Info = () => {
    const location = useLocation()
    const hunter = location.state || {}

    return (
        <div className="Info">
            <h1>{hunter.name}</h1>
            <p>Element: {hunter.element}</p>
            <p>Weapon: {hunter.weapon}</p>
            <p>Role: {hunter.role}</p>
            <p>Description: {hunter.description}</p>
            <Link to={'/summary'}><button className='backButton'>Back</button></Link>
        </div>
    )
}

export default Info
