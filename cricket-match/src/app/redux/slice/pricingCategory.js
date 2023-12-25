const { createSlice } = require("@reduxjs/toolkit");


const pricingCategorySlice = createSlice({
    name:"pricingCategory",
    initialState:{
        package_id:""
    },
    reducers:{
        pricingCategoryactions(state,action){
            console.log(action.payload);
            state.package_id = action.payload
        }
    }
})


export const {pricingCategoryactions} = pricingCategorySlice.actions;
export default pricingCategorySlice.reducer;
