import apiRequest from "../lib/apiRequest";
export const chatService = {
    async createChat(chatDto) {
        try {
            const res = await apiRequest.post("/chats", 
                chatDto
            );
            return res.data;
        } catch (err) {
            return err;
        }
    },
    async getAllChats(query){
        try {
            const res = await apiRequest.get("/chats",query);
            return res.data;
        } catch (err) {
            return err;
        }
    }
};