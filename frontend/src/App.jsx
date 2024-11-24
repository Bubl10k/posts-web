import { useEffect, useState } from "react";
import PostService from "./services/post.service";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    author: "",
  });
  const [editingPost, setEditingPost] = useState(null);

  console.log(posts);

  // Завантаження постів
  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await PostService.getPosts();
        setPosts(data);
      } catch (error) {
        toast.error("Failed to fetch posts");
        console.error("Failed to fetch posts:", error);
      }
    }
    fetchPosts();
  }, []);

  // Створення посту
  const handleCreatePost = async () => {
    try {
      const createdPost = await PostService.createPost(newPost);
      setPosts([...posts, createdPost]);
      setNewPost({ title: "", description: "", author: "" });
      toast.success("Post created successfully");
    } catch (error) {
      toast.error("Failed to create post");
      console.error("Failed to create post:", error);
    }
  };

  // Оновлення посту
  const handleUpdatePost = async () => {
    console.log(editingPost);
    try {
      const updatedPost = await PostService.updatePost(editingPost);
      setPosts(
        posts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
      );
      setEditingPost(null);
      toast.success("Post updated successfully");
    } catch (error) {
      toast.error("Failed to update post");
      console.error("Failed to update post:", error);
    }
  };

  // Видалення посту
  const handleDeletePost = async (id) => {
    try {
      await PostService.deletePost(id);
      setPosts(posts.filter((post) => post._id !== id));
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error("Failed to delete post");
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Posts Management
      </Typography>

      <Box display="flex" flexDirection="column" gap={2} mb={4}>
        {editingPost ? (
          <>
            <TextField
              label="Title"
              value={editingPost.title}
              onChange={(e) =>
                setEditingPost({ ...editingPost, title: e.target.value })
              }
              fullWidth
              required
            />
            <TextField
              label="Description"
              value={editingPost.description}
              onChange={(e) =>
                setEditingPost({
                  ...editingPost,
                  description: e.target.value,
                })
              }
              fullWidth
              required
            />
            <TextField
              label="Author"
              value={editingPost.author}
              onChange={(e) =>
                setEditingPost({ ...editingPost, author: e.target.value })
              }
              fullWidth
              required
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdatePost}
            >
              Update Post
            </Button>
          </>
        ) : (
          <>
            <TextField
              label="Title"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
              fullWidth
              required
            />
            <TextField
              label="Description"
              value={newPost.description}
              onChange={(e) =>
                setNewPost({ ...newPost, description: e.target.value })
              }
              fullWidth
              required
            />
            <TextField
              label="Author"
              value={newPost.author}
              onChange={(e) =>
                setNewPost({ ...newPost, author: e.target.value })
              }
              fullWidth
              required
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreatePost}
            >
              Create Post
            </Button>
          </>
        )}
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        {posts.map((post) => (
          <Card key={post._id}>
            <CardContent>
              <Typography variant="h5">{post.title}</Typography>
              <Typography color="text.secondary">{post.description}</Typography>
              <Typography variant="body2">Author: {post.author}</Typography>
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                onClick={() => setEditingPost({ ...post })}
              >
                Edit
              </Button>
              <Button
                color="secondary"
                onClick={() => handleDeletePost(post._id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
}

export default App;
