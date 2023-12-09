const { createSlice } = require("@reduxjs/toolkit");


const regAdminSlice = createSlice({
    name:"regAdmin",
    initialState:{
        package: {}
        },
    reducers:{
        regInfo(state,action){
            console.log(action.payload);
            state.package = action.payload
        }
    }
})


export const {regInfo} = regAdminSlice.actions;
export default regAdminSlice.reducer;
