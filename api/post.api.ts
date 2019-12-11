import axios from 'axios';

const API_URL = "http://localhost:4000/api";

export interface PostType {
    id: string
    title: string
    content: string
}

export const getPosts = async () => {
    const response = await axios.get(`${API_URL}/posts`);
    const { data : { posts } } = response;

    return {
        posts
    }
};

export const getPost = async (postId: string) => {
    const response = await axios.get(`${API_URL}/posts/${postId}`)
    const { data: { post }} = response;

    return {
        post
    }
}