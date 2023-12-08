import ticketSlice from "./slice/ticketSlice";

const { configureStore } = require("@reduxjs/toolkit");


const store = configureStore({
    reducer:{
        ticketInfo:ticketSlice
    }
});

export default store