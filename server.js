const express = require('express')
const cors = require('cors')

const app = express()

// Temporarily allow all origins for CORS
var corsOptions = {
    origin: '*'
}

// middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routers
const router = require('./routes/userRouter.js')
app.use('/api/users', router)

// testing api
app.get('/', (req, res) => {
    res.json({ message: 'hello from api' })
})

// port
const PORT = process.env.PORT || 8080

// server 
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})

// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})