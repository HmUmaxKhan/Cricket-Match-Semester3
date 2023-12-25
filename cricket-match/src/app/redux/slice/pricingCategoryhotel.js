const { createSlice } = require("@reduxjs/toolkit");


const pricingCategoryHotelSlice = createSlice({
    name:"pricingCategoryHotel",
    initialState:{
        packageId:""
    },
    reducers:{
        pricingCategoryHotelactions(state,action){
            console.log(action.payload);
            state.packageId = action.payload
        }
    }
})


export const {pricingCategoryHotelactions} = pricingCategoryHotelSlice.actions;
export default pricingCategoryHotelSlice.reducer;
