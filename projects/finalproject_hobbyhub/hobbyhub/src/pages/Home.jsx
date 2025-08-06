import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";  // <-- Import useLocation
import PostCard from "../components/PostCard";
import { supabase } from "../client";

import './Home.css';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [sortMode, setSortMode] = useState('newest');

    const location = useLocation(); // to get query params

    // Parse search query param from URL
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('id, title, content, image_url, upvotes, created_at, comments')
                .order('created_at', { ascending: true });

            if (error) {
                console.error(error);
            } else {
                setPosts(data);
            }
        };
        fetchPosts();
    }, []);

    const sortNewest = () => setSortMode('newest');
    const sortPopular = () => setSortMode('popular');

    // Filter posts by search query in the title
    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery)
    );

    // Sort filtered posts
    const sortedPosts = [...filteredPosts].sort((a, b) => {
        if (sortMode === 'newest') {
            return new Date(b.created_at) - new Date(a.created_at);
        }
        if (sortMode === 'popular') {
            return b.upvotes - a.upvotes;
        }
        return 0;
    });

    return (
        <div className="Home">
            <div className="sortButtons">
                <p>Order by: </p>
                <button onClick={sortNewest}>Newest</button>
                <button onClick={sortPopular}>Most Popular</button>
            </div>

            {sortedPosts.length > 0 ? (
                sortedPosts.map(post => (
                    <PostCard
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        content={post.content}
                        image_url={post.image_url}
                        upvotes={post.upvotes}
                        created_at={post.created_at}
                        comments={post.comments || []}
                    />
                ))
            ) : <h2>No Posts Found</h2>}
        </div>
    );
}

export default Home;
