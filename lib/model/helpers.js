import cookie from 'cookie'
import crypto from 'crypto'
import mongoose from 'mongoose'
import generateNanoId from 'nanoid/generate'

export function createModel(entityDBName, entitySchema, collectionName) {
  try {
    return mongoose.model(entityDBName, entitySchema, collectionName)
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

export function getCookie(req, cookieName) {
  const reqCookies = req.cookies || cookie.parse(req.headers['cookie'] || '')
  return reqCookies[cookieName]
}

export function getSha256Base64(s) {
  const h = crypto.createHash('sha256')
  h.update(s)
  return h.digest('base64').replace('=', '')
}

if (getSha256Base64('test') !== 'n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg') {
  throw new Error('getSha256Base64 test failed')
}
