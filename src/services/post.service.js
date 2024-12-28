import apiRequest from "../lib/apiRequest";
export const postService = {
    
    async createPost(postDto) {
        try {
            console.log('vdsbhnm,nm , nm,', {postDto})
            const res = await apiRequest.post("/posts", 
                postDto
            );
            console.log('vdsbhnm,nm ', res.data);
            return res.data;
        } catch (err) {
            return err;
        }
    },
    async getAllPosts(query){
        try {
            const res = await apiRequest.get("/posts",query);
            return res.data;
        } catch (err) {
            return err;
        }
    },
    async getPostById(postId){
        try {
            const res = await apiRequest.get(`/posts/${postId}`);
            return res.data;
        } catch (err) {
            return err;
        }
    },
};
