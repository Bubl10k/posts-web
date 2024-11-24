import axios from "axios";

const PostService = {
  async getPosts() {
    try {
      const response = await axios.get("/api/posts");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async createPost(post) {
    try {
      const response = await axios.post("/api/posts", post);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async updatePost(post) {
    try {
      const response = await axios.put(`/api/posts/${post._id}`, post);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async deletePost(id) {
    try {
      const response = await axios.delete(`/api/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

};

export default PostService;