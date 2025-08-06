import { useState } from 'react'
import { supabase } from '../client'
import './NewPost.css'
import { useParams } from 'react-router-dom'

import './EditPost.css'

const EditPost = () => {
    const [post, setPost] = useState({ title: "", content: "", image_url: "" })
    const { id } = useParams()

    const updatePost = async (event) => {
        event.preventDefault()
        await supabase
            .from('posts')
            .update({ title: post.title, content: post.content, image_url: post.image_url })
            .eq('id', id)
        window.location = "/"
    }

    const deletePost = async (event) => {
        event.preventDefault()
        await supabase
            .from('posts')
            .delete()
            .eq('id', id)
        window.location = "/"
    }

    const handleChange = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value })
    }

    return (
        <div className="EditPost">
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
            <div className="buttons">
                <button className='backButton' onClick={() => navigate('/')}>Back</button>
                <button className='updateButton' onClick={updatePost}>Update</button>
                <button className='deleteButton' onClick={deletePost}>Delete</button>
            </div>
        </div>
    )
}

export default EditPost