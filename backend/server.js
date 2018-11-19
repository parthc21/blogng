const express=require('express')
const cors=require('cors')
const {db}=require('./db/index.js')
const app=express()
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))


app.use('/users',require('./routes/User'))
app.use('/article',require('./routes/Articles'))

db.sync()
    .then(()=>{
        console.log('server started')
        app.listen(4141,()=>{})
    })
    .catch(console.error())
