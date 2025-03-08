const express = require("express");
const fs = require("node:fs/promises");

const app = express();
app.use(express.json());

// Function to get stored posts
async function getStoredPosts() {
  try {
    const rawFileContent = await fs.readFile("posts.json", "utf-8");
    const data = JSON.parse(rawFileContent);
    return data.posts ?? [];
  } catch (error) {
    return [];
  }
}

// Function to store posts
function storePosts(posts) {
  return fs.writeFile("posts.json", JSON.stringify({ posts: posts || [] }));
}

// API Route to get posts
app.get("/posts", async (req, res) => {
  const posts = await getStoredPosts();
  res.json(posts);
});

// Root route to check if the server is running
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
