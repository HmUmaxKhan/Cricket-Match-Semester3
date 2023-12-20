const { createSlice } = require("@reduxjs/toolkit");


const matchIdSlice = createSlice({
    name:"ticketInfo",
    initialState:{
        match_id:""
    },
    reducers:{
        matchIdaction(state,action){
            console.log(action.payload);
            state.match_id = action.payload
        }
    }
})


export const {matchIdaction} = matchIdSlice.actions;
export default matchIdSlice.reducer;
