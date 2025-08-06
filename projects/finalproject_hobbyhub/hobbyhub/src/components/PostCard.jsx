import { Link } from 'react-router-dom'
import more from './more.png'
import './PostCard.css'
import { supabase } from '../client'

// Component to display a specific post
// To be used in Home.jsx
const PostCard = (props) => {

    const getTimeAgo = (timestamp) => {
        const postDate = new Date(timestamp);
        const now = new Date();
        const secondsAgo = Math.floor((now - postDate) / 1000);

        if (secondsAgo < 60) {
            return `Posted ${secondsAgo}s ago`
        }
        const minutesAgo = Math.floor(secondsAgo / 60)
        if (minutesAgo < 60) {
            return `Posted ${minutesAgo}m ago`
        }
        const hoursAgo = Math.floor(minutesAgo / 60);
        if (hoursAgo < 24) {
            return `Posted ${hoursAgo}h ago`
        }
        const daysAgo = Math.floor(hoursAgo / 24)
        return `Posted ${daysAgo}d ago`
    }

    const handleAddComment = async () => {
        if (!newComment.trim()) return

        setLoading(true)

        // Prepare updated comments array
        const updatedComments = [...comments, newComment.trim()]

        // Update supabase
        const { data, error } = await supabase
            .from('posts')
            .update({ comments: updatedComments })
            .eq('id', props.id)

        setLoading(false)

        if (error) {
            alert('Error adding comment: ' + error.message)
            return
        }

        setComments(updatedComments)
        setNewComment('')
    }


    return (
        <div className="PostCard">

            <Link to={{
                pathname: `post/${props.id}`
            }} state={{ ...props }}> {/* Passes all props into <PostInfo /> */}

                <div className="cardContent">
                    <p className="timestamp">{getTimeAgo(props.created_at)}</p>
                    <h2 className="name">{props.title}</h2>
                    <p className='upvotes'>{props.upvotes} upvotes</p>
                    <p className='commentCount'>{props.comments.length} comments</p>
                </div>

            </Link>
        </div>
    )
}

export default PostCard