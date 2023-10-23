const express= require('express');
var cors = require('cors')

const app = express();
app.use(cors())

app.use(express.json());

app.use('/api/auth',require('./routers/auth/reg'));
app.use('/api/auth',require('./routers/auth/login'));


app.listen(5005,()=>{console.log("Connected to port 5005");})