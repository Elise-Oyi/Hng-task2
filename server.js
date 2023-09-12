import express from 'express'
import mongoose from 'mongoose'
import User from './modules/userModel.js'


const app = express()

app.use(express.json())

//--ROUTES
//--add person      (C)
app.post('/api', async(req,res)=>{
    try {
        const user = await User.create(req.body)
        res.status(204).json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
})

//--get by id/name  (R)
app.get('/api/:user_id', async(req,res)=>{
    try {
        const {user_id} = req.params
        const user = await User.findById(user_id)
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
})

//--get all users
app.get('/api', async(req,res)=>{
    try {
        const user = await User.find({})
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
})

//--update person  (U)
app.put('/api/:user_id', async(req,res)=>{
    try {
        const {user_id} = req.params
        const user = await User.findByIdAndUpdate(user_id, req.body)
        if(!user){
            return res.status(404).json({message:"User does not exist"})
          }

          const updatedUser = await User.findById(user_id)
          res.status(200).json(updatedUser)

    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
})

//--delete person   (D)
app.delete('/api/:user_id', async(req,res)=>{
    try {
        const {user_id} = req.params
        const user = await User.findByIdAndDelete(user_id)
        if(!user){
            return res.status(404).json({message:"User does not exist"})
          }

          res.status(200).json(user)

    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
})

const dbURI = process.env.dbURI || 'mongodb+srv://ninjablog:k12345@cluster0.tgp8ggd.mongodb.net/ninja-blog'

const PORT = process.env.PORT || 8000



mongoose.connect(dbURI)
.then(()=>{
    console.log("Succesfully connected to Db")
    app.listen(PORT,()=>{
        console.log(`Server is listening on port ${PORT}`)
    })
})
.catch((error)=>{
    console.log(error)
})