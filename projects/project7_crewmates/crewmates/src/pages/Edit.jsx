import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './Edit.css'
import { supabase } from '../client'
import CreateCard from '../components/CreateCard'
import { Link } from 'react-router-dom'


const Edit = ({ data }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [hunter, setHunter] = useState({ id: null, name: "", element: "", weapon: "", role: "", description: "" })

    const handleChange = (event) => {
        const { name, value } = event.target
        setHunter((prev) => {
            return {
                ...prev, [name]: value,
            }
        })
    }

    const updateHunter = async (event) => {
        event.preventDefault()
        await supabase
            .from('crewmates')
            .update({ name: hunter.name, element: hunter.element, weapon: hunter.weapon, role: hunter.role, description: hunter.description })
            .eq('id', id)
        window.location = "/"
    }

    const deleteHunter = async (event) => {
        event.preventDefault()
        await supabase
            .from('crewmates')
            .delete()
            .eq('id', id)
        window.location = "/"
    }

    return (
        <div className="Edit">
            <h1>Edit your hunter</h1>
            <div className="container">
                <CreateCard
                    text="Name:"
                    placeholder="Enter hunter's name"
                    name="name"
                    value={hunter.name}
                    onChange={handleChange}
                />
                <CreateCard
                    text="Element:"
                    placeholder="Fire, Shadow, etc"
                    name="element"
                    value={hunter.element}
                    onChange={handleChange}
                />
                <CreateCard
                    text="Weapon:"
                    placeholder="Swords, Staff, Magic, etc"
                    name="weapon"
                    value={hunter.weapon}
                    onChange={handleChange}
                />
                <CreateCard
                    text="Role:"
                    placeholder="Vanguard, Assassin, etc"
                    name="role"
                    value={hunter.role}
                    onChange={handleChange}
                />
                <CreateCard
                    text="Description:"
                    placeholder="..."
                    name="description"
                    value={hunter.description}
                    onChange={handleChange}
                />
            </div>
            <div className="buttons">
                <button className='backButton' onClick={() => navigate('/summary')}>Back</button>
                <button className='updateButton' onClick={updateHunter}>Update</button>
                <button className='deleteButton' onClick={deleteHunter}>Delete</button>
            </div>
        </div>
    )
}

export default Edit