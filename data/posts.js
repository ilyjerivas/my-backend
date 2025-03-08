const express = require('express');
const fs = require('fs/promises');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Load posts
async function getStoredPosts() {
    const rawFileContent = await fs.readFile('posts.json', 'utf-8');
    const data = JSON.parse(rawFileContent);
    return data.posts ?? [];
}

// Store posts
function storePosts(posts) {
    return fs.writeFile('posts.json', JSON.stringify({ posts: posts || [] }));
}

// API route to get posts
app.get('/posts', async (req, res) => {
    const posts = await getStoredPosts();
    res.json(posts);
});

// API route to add a post
app.post('/posts', async (req, res) => {
    const posts = await getStoredPosts();
    posts.push(req.body);
    await storePosts(posts);
    res.status(201).json({ message: 'Post added successfully' });
});

// Default route
app.get('/', (req, res) => {
    res.send('Backend is working!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

