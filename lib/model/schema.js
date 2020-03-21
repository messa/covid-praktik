import mongoose from 'mongoose'

// just some sample schema

const kittySchema = new mongoose.Schema({
    name: String
  })

export const Kitten = mongoose.model('Kitten', kittySchema)
