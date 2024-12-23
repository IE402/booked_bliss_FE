import apiRequest from "../lib/apiRequest";
export const reviewService = {
    
    async addReview(reviewDto) {
        try {
            console.log('vdsbhnm,nm , nm,', {reviewDto})
            const res = await apiRequest.post("/reviews", 
                reviewDto
            );
            // đảo ngược mảng trả về            
            return res.data;
        } catch (err) {
            return err;
        }
    },
    async getAllReviewByPost(postId){
        try {
            const res = await apiRequest.get("/reviews/getByPost/"+postId);
            console.log('vdsbhnm,nm ', res.data);
            //đảo ngược mảng trả về

            return res.data.reverse();
        } catch (err) {
            return err;
        }
    }
};
