import React from "react";

const BlogPost = ({ post }) => {
    return (
        <div>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>By {post.author.username}</p>
        </div>
    );
};

export default BlogPost;
