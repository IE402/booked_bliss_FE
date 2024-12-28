import apiRequest from "../lib/apiRequest";
export const userService = {
    async getUserById(userId){
        try {
            const res = await apiRequest.get("/users/search/"+ userId);
            console.log('vdsbhnm,nm ', res.data);
            return res.data;
        } catch (err) {
            return err;
        }
    }
};