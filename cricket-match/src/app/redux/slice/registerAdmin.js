const { createSlice } = require("@reduxjs/toolkit");


const regAdminSlice = createSlice({
    name:"regAdmin",
    initialState:{
        regpayment: "",
        admin_id: {}
        },
    reducers:{
        regInfo(state,action){
            console.log(action.payload);
            state.regpayment = action.payload
        },
        adminId(state,action){
            console.log(action.payload);
            state.admin_id = action.payload
        }
    }
})


export const {adminId,regInfo} = regAdminSlice.actions;
export default regAdminSlice.reducer;
