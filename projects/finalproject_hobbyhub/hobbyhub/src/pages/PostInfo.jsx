import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Link } from 'react-router-dom';

import more from '../components/more.png'

import './PostInfo.css';

const PostInfo = () => {
    const { id } = useParams();
    const location = useLocation();
    const initialPost = location.state || {};

    const [post, setPost] = useState(initialPost);
    const [upvotes, setUpvotes] = useState(initialPost.upvotes || 0);
    const [comments, setComments] = useState(initialPost.comments || []);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch post if no state was passed
    useEffect(() => {
        if (!initialPost || !initialPost.comments || !initialPost.upvotes) {
            const fetchPost = async () => {
                const { data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) {
                    console.error('Error fetching post:', error);
                } else {
                    setPost(data);
                    setUpvotes(data.upvotes || 0);
                    setComments(data.comments || []);
                }
            };

            fetchPost();
        }
    }, [id, initialPost]);

    const getTimeAgo = (timestamp) => {
        const postDate = new Date(timestamp);
        const now = new Date();
        const secondsAgo = Math.floor((now - postDate) / 1000);

        if (secondsAgo < 60) return `Posted ${secondsAgo}s ago`;
        const minutesAgo = Math.floor(secondsAgo / 60);
        if (minutesAgo < 60) return `Posted ${minutesAgo}m ago`;
        const hoursAgo = Math.floor(minutesAgo / 60);
        if (hoursAgo < 24) return `Posted ${hoursAgo}h ago`;
        const daysAgo = Math.floor(hoursAgo / 24);
        return `Posted ${daysAgo}d ago`;
    };

    const handleUpvote = async () => {
        const newUpvotes = upvotes + 1;
        setUpvotes(newUpvotes);

        const { error } = await supabase
            .from('posts')
            .update({ upvotes: newUpvotes })
            .eq('id', id);

        if (error) {
            console.error('Error updating upvotes:', error);
            setUpvotes(upvotes); // rollback on error
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        const updatedComments = [...comments, newComment.trim()];
        setLoading(true);

        const { error } = await supabase
            .from('posts')
            .update({ comments: updatedComments })
            .eq('id', id);

        setLoading(false);

        if (error) {
            alert('Error adding comment: ' + error.message);
        } else {
            setComments(updatedComments);
            setNewComment('');
        }
    };

    return (
        <div className="PostInfo">
            <Link to={{ pathname: `/edit/${id}` }}>
                <img
                    className="moreButton"
                    alt="edit button"
                    src={more}
                    onClick={(e) => {
                        e.preventDefault()
                        window.location.href = `/edit/${id}`
                    }}
                />
            </Link>
            <p className="timestamp">{getTimeAgo(post.created_at)}</p>
            <h2 className="name">{post.title}</h2>
            <p className="content">{post.content}</p>

            {post.image_url && (
                <img className="image" src={post.image_url} alt="Post" />
            )}


            <p className="upvotes">{upvotes} upvotes</p>
            <button
                className="upvoteButton"
                onClick={handleUpvote}
                disabled={loading}
            >
                Upvote
            </button>

            <div className="comments">
                <h4>Comments:</h4>
                {comments.length === 0 && <p>No comments yet.</p>}
                <ul>
                    {comments.map((c, i) => (
                        <li key={i}>{c}</li>
                    ))}
                </ul>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddComment();
                    }}
                >
                    <input
                        className="input"
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        disabled={loading}
                    />
                </form>


            </div>
        </div>
    );
};

export default PostInfo;
