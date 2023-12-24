const { createSlice } = require("@reduxjs/toolkit");


const userIdSlice = createSlice({
    name:"ticketInfo",
    initialState:{
        transport_id:""
    },
    reducers:{
        userIdaction(state,action){
            console.log(action.payload);
            state.transport_id = action.payload
        }
    }
})


export const {userIdaction} = user.actions;
export default transportIdSlice.reducer;
