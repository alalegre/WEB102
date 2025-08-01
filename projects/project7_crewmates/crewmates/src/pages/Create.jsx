import { useState } from 'react'
import './Create.css'
import { supabase } from '../client'
import CreateCard from '../components/CreateCard'
import './Create.css'


const Create = () => {
    const [hunter, setHunter] = useState({ name: "", element: "", weapon: "", role: "" })

    const createHunter = async (event) => {
        event.preventDefault();

        const { data, error } = await supabase
            .from('crewmates')
            .insert([hunter])

        if (error) {
            console.error('Insert errror:', error.message)
        } else {
            console.log("Inserted:", data)
            window.location = '/'
        }
    }

    const handleChange = (event) => {
        setHunter({ ...hunter, [event.target.name]: event.target.value })
    }

    return (
        <div className="Create">
            <h1>Create your hunter here</h1>
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
            <button className='createHunter' onClick={createHunter}>Create</button>
        </div>
    )
}

export default Create