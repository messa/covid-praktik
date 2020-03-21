import mongoose from 'mongoose'

// just some sample schema

const kittySchema = new mongoose.Schema({
  name: String
})

function createModel(entityDBName, entitySchema) {
  try {
    return mongoose.model(entityDBName, entitySchema)
  } catch (err) {
    if (err.name == 'OverwriteModelError') {
      // "Cannot overwrite `...` model once compiled."
      // happens in Next.js development mode
      return mongoose.models[entityDBName]
    }
    // other error
    throw err
  }
}

export const Kitten = createModel('Kitten', kittySchema)
