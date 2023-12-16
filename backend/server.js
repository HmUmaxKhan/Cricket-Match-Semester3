const express= require('express');
var cors = require('cors')
const update = require("./routers/auth/update");

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


app.use('/api/auth',require('./routers/auth/reg'));
app.use('/api/auth',require('./routers/auth/login'));
app.use('/api/auth',update);
app.use('/api',require("./routers/tournament/tournament"));
app.use('/api',require("./routers/matches/matches"));
app.use('/api',require("./routers/hotels/hotels"));
app.use('/api',require("./routers/tickets/ticket"));
app.use('/api',require("./routers/getallusers/getallusers"));
app.use('/api',require("./routers/payments/payments"));
app.use('/api',require("./routers/hotelOwnersReg/hotelReg"));
app.use('/api',require("./routers/rootLogin_tournamentEdit/tournamentEdit"));
app.use('/api',require("./routers/matchEdit/matchEdit"));





app.listen(5005,()=>{console.log("Connected to port 5005");})