const express= require('express');
var cors = require('cors')
const update = require("./routers/auth/update");

const app = express();
app.use(cors())

app.use(express.json());

app.use('/api/auth',require('./routers/auth/reg'));
app.use('/api/auth',require('./routers/auth/login'));
app.use('/api/auth',update);
app.use('/api',require("./routers/tournament/tournament"));
app.use('/api',require("./routers/matches/matches"));



app.listen(5005,()=>{console.log("Connected to port 5005");})