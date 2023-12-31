import registerAdmin from "./slice/registerAdmin";
import ticketSlice from "./slice/ticketSlice";
import tournamentId from "./slice/tournamentId"
import matchId from "./slice/matchIdSlice"
import transportId from './slice/transportIdSlice'
import pricingCategory from "./slice/pricingCategory"
import pricingCategoryHotel from "./slice/pricingCategoryhotel";
import ticketPriceSlice from "./slice/ticketPriceSlice";

const { configureStore } = require("@reduxjs/toolkit");


const store = configureStore({
    reducer:{
        ticketInfo:ticketSlice,
        regInfo:registerAdmin,
        tournamentId:tournamentId,
        matchId:matchId,
        transportId:transportId,
        pricingCategory:pricingCategory,
        pricingCategoryHotel:pricingCategoryHotel,
        ticket:ticketPriceSlice
    }
});

export default store