const { createSlice } = require("@reduxjs/toolkit");

const initialState={
    ticketPayment:{
        ticketPrice:"",
        ticketCategory:"",
        matchId:"",
        userId:""
    }
}

const ticketPriceSlice = createSlice({
    name:"ticketPrice",
    initialState,
    reducers:{
        ticketDetail:(state,action)=>{
            console.log(action.payload);
            state.ticketPayment=action.payload
        },
    }
});

export const {ticketDetail} = ticketPriceSlice.actions;
export default ticketPriceSlice.reducer;
