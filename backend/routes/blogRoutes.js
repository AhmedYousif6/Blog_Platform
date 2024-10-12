const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const { isAuthenticated } = require('./auth');

router.get('/', async (req, res) => {
    try {
        const posts = await BlogPost.find().populate('author', 'username');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve posts' });
    }
});

router.post('/create', isAuthenticated, async (req, res) => {
    const { title, content } = req.body;
    try {
        const newPost = new BlogPost({
            title,
            content,
            author: req.session.userId,
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create post' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id).populate('author', 'username');
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving post' });

    }
});

router.put('/:id/edit', isAuthenticated, async (req, res) => {
    const { title, content } = req.body;
    try {
        post = await BlogPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        if (post.author.toString() !== req.session.userId) {
            return res.status(403).json({ error: 'You can only edit your own posts' });
        }
        post.title = title || post.title;
        post.content = content || post.content;
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update post' });
    }
});

router.delete('/:id/delete', isAuthenticated, async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if(!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        if (post.author.toString() !== req.session.userId) {
            return res.status(403).json({ error: 'You can only delete your own posts' });
        }
        await post.remove();
        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete post' });
    }
});

module.exports = router;
