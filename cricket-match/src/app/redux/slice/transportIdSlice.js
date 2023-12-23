const { createSlice } = require("@reduxjs/toolkit");


const transportIdSlice = createSlice({
    name:"ticketInfo",
    initialState:{
        transport_id:""
    },
    reducers:{
        transportIdaction(state,action){
            console.log(action.payload);
            state.transport_id = action.payload
        }
    }
})


export const {transportIdaction} = transportIdSlice.actions;
export default transportIdSlice.reducer;
