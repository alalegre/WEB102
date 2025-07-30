import { useState } from 'react'
import './Create.css'
import { supabase } from '../client'
import CreateCard from '../components/CreateCard'
import './Create.css'


const Create = () => {
    const [hunter, setHunter] = useState({ name: "", element: "", weapon: "", role: "" })

    const createHunter = async () => {
        event.preventDefault();

        window.location = '/'

    }

    return (
        <div className="Create">
            <h1>Create your hunter here</h1>
            <div className="container">
                <CreateCard text="Name:" placeholder="Enter hunter's name" />
                <CreateCard text="Element:" placeholder="Fire, Shadow, etc" />
                <CreateCard text="Weapon:" placeholder="Swords, Staff, Magic, etc" />
                <CreateCard text="Role:" placeholder="Vanguard, Assassin, etc" />
            </div>
            <input type='submit' value="Submit" onClick={createHunter} />

        </div>
    )
}

export default Create