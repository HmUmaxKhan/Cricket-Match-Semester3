import registerAdmin from "./slice/registerAdmin";
import ticketSlice from "./slice/ticketSlice";
import tournamentId from "./slice/tournamentId"
import matchId from "./slice/matchIdSlice"
import transportId from './slice/transportIdSlice'

const { configureStore } = require("@reduxjs/toolkit");


const store = configureStore({
    reducer:{
        ticketInfo:ticketSlice,
        regInfo:registerAdmin,
        tournamentId:tournamentId,
        matchId:matchId,
        transportId:transportId
    }
});

export default store