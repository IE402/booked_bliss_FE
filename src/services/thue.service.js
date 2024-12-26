import apiRequest from "../lib/apiRequest";
export const thueService = {
    
    async addHopDong(hopDongDto) {
        try {
            const res = await apiRequest.post("/thues", 
                hopDongDto
            );
            console.log('vdsbhnm,nm ', res.data);
            return res.data;
        } catch (err) {
            return err;
        }
    },
    async getAllHopDongByUserId(userId){
        try {
            const res = await apiRequest.get("/thues/"+ userId);
            return res.data;
        } catch (err) {
            return err;
        }
    }
};