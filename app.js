const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const blogsRoute = require("./routes/blogs")
const authRoute = require("./routes/auth")
const eventsRoute = require('./routes/events')

require("dotenv").config()

const app = express()

//connect cloud database
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:false
})
.then(()=>console.log("DATABASE CONNECTED"))
.catch((err)=>console.log(err))

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({limit:"2mb", extended: false}))
app.use(bodyParser.json({limit:"2mb"}))

//router
app.use('/api/auth', authRoute)
app.use("/api", blogsRoute)
app.use('/api', eventsRoute)

const port = process.env.PORT || 8080

app.listen(port, ()=>console.log(`Start server in port ${port}`))
