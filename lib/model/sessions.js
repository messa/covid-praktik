import { generateShortId, getSha256Base64, getCookie } from './helpers'
import { Session } from './schema'
import './connect'

const sessionCookieName = 'oopev_sess'

function generateSessionId() {
  return generateShortId() + generateShortId() + generateShortId()
}

export async function getSession(req, res) {
  let sessionId = getCookie(req, sessionCookieName)
  let session = null
  if (sessionId) {
    session = await Session.findOne({ _id: getSha256Base64(sessionId), expireDate: { $gt: new Date() } }).exec()
  }
  if (!sessionId || !session) {
    sessionId = generateSessionId()
    session = new Session({
      _id: getSha256Base64(sessionId),
      createDate: new Date(),
      lastUpdateDate: new Date(),
      expireDate: new Date(new Date() * 1 + 100 * 86400 * 1000),
      data: '{}',
    })
    await session.save()
    const cookieHeader = `${sessionCookieName}=${sessionId}; Max-Age=${100 * 86400}; HttpOnly; SameSite=Strict; Path=/`
    res.setHeader('Set-Cookie', cookieHeader)
  }
  const sessionManager = new SessionManager(session)
  return sessionManager
}

class SessionManager {

  constructor(sessionEntity) {
    this.sessionEntity = sessionEntity
    this.data = JSON.parse(sessionEntity.data)
  }

  save() {
    this.sessionEntity.data = JSON.stringify(this.data)
    this.sessionEntity.lastUpdateDate = new Date()
    this.sessionEntity.save()
  }

  get(key) {
    return this.data[key]
  }

  update(key, value) {
    this.data[key] = value
    this.save()
  }

}
