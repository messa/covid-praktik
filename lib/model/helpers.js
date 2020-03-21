import mongoose from 'mongoose'
import generateNanoId from 'nanoid/generate'

export function createModel(entityDBName, entitySchema) {
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

export function generateShortId() {
  return generateNanoId('234567890abcdefghijkmnopqrstuvwxyz', 10)
}
