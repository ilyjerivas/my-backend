const express = require("express");
const cors = require("cors"); // Import CORS

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS

const fs = require("node:fs/promises");

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
  res.json({ posts }); // Ensure response is correctly structured
});

// API Route to add a post
app.post("/posts", async (req, res) => {
  const newPost = req.body;
  const posts = await getStoredPosts();
  posts.push(newPost);
  await storePosts(posts);
  res.status(201).json({ message: "Post added successfully!" });
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
