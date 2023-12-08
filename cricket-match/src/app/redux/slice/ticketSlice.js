const { createSlice } = require("@reduxjs/toolkit");


const ticketInfoSlice = createSlice({
    name:"ticketInfo",
    initialState:{
        ticketInfo:{}
    },
    reducers:{
        ticketInfoReducer(state,action){
            console.log(action.payload);
            state.ticketInfo = action.payload
        }
    }
})


export const {ticketInfoReducer} = ticketInfoSlice.actions;
export default ticketInfoSlice.reducer;
