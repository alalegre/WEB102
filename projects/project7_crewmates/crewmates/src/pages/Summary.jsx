import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient"
import { useEffect } from "react"
import CreateCard from "../components/CreateCard"
import Card from "../components/Card"
import { useState } from 'react'
import { supabase } from '../client'
import './Summary.css'

const Summary = (props) => {

    const [hunters, setHunters] = useState([])

    useEffect(() => {
        const fetchHunters = async () => {
            const { data } = await supabase
                .from('crewmates')
                .select()
                .order('created_at', { ascending: true })
            setHunters(data)
        }
        fetchHunters().catch(console.error)
    }, [props])

    return (
        <div className="Summary">
            {
                hunters && hunters.length > 0 ?
                    [...hunters]
                        .sort((a, b) => a.id - b.id)
                        .map((hunters, index) =>
                            <Card
                                key={hunters.id}
                                id={hunters.id}
                                name={hunters.name}
                                element={hunters.element}
                                weapon={hunters.weapon}
                                role={hunters.role}
                                description={hunters.description}
                            />

                        ) : <h2>{"No Hunters Yet"}</h2>
            }
        </div>
    )
}

export default Summary