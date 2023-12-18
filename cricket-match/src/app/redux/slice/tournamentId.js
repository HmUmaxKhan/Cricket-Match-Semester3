const { createSlice } = require("@reduxjs/toolkit");


const tournamentIdSlice = createSlice({
    name:"ticketInfo",
    initialState:{
        tournament_id:""
    },
    reducers:{
        tournamentIdaction(state,action){
            console.log(action.payload);
            state.ticketInfo = action.payload
        }
    }
})


export const {tournamentIdaction} = tournamentIdSlice.actions;
export default tournamentIdSlice.reducer;
