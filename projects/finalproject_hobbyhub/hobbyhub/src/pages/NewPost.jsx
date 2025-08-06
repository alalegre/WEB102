import { useState } from 'react'
import { supabase } from '../client'
import './NewPost.css'


const NewPost = () => {
    const [post, setPost] = useState({ title: "", content: "", image_url: "" })

    const createPost = async (event) => {
        event.preventDefault()

        const { data, error } = await supabase
            .from('posts')
            .insert([post])

        if (error) {
            console.error('Insert error:', error.message)
        } else {
            console.log("Inserted:", data)
            window.location = '/'
        }
    }

    const handleChange = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value })
    }

    return (
        <div className="NewPost">
            <div className="postCard">
                <input
                    type="text"
                    name="title"
                    placeholder='Title'
                    onChange={handleChange}
                />
                <textarea
                    className='desc'
                    type="text"
                    name="content"
                    placeholder='Description (Optional)'
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="image_url"
                    placeholder='Image URL (Optional)'
                    onChange={handleChange}
                />
            </div>
            <button className='createPost' onClick={createPost}>Create</button>
        </div>
    )
}

export default NewPost