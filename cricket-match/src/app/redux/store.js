import registerAdmin from "./slice/registerAdmin";
import ticketSlice from "./slice/ticketSlice";
import tournamentId from "./slice/tournamentId"

const { configureStore } = require("@reduxjs/toolkit");


const store = configureStore({
    reducer:{
        ticketInfo:ticketSlice,
        regInfo:registerAdmin,
        tournamentId:tournamentId
    }
});

export default store