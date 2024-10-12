import React, { useState, useEffect } from "react";
import { getAllPosts } from "../../api";
import BlogPost from './BlogPost';

const BlogList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await getAllPosts();
            setPosts(response.data);
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <h2>Blog Posts</h2>
            {posts.map(post => (
                <BlogPost key={post.id} post={post} />
            ))}
        </div>
    );
};

export default BlogList;
