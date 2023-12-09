import registerAdmin from "./slice/registerAdmin";
import ticketSlice from "./slice/ticketSlice";

const { configureStore } = require("@reduxjs/toolkit");


const store = configureStore({
    reducer:{
        ticketInfo:ticketSlice,
        regInfo:registerAdmin
    }
});

export default store