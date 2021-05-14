const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");
const app = express();

//To use env variables
require("dotenv").config();

//connect to database
require("./db/connectDB");

//import routes
const apiRoutes = require("./routes/apiRoutes");



app.use(express.json())
app.use(cors())


app.use('/api',apiRoutes)

const port = process.env.PORT;

app.listen(port,() =>{
    console.log('Server Started port ' + 8000)
})

