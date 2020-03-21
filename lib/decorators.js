import { getSession } from './model/sessions'
import { getUserById } from './model/users'

export function withSession(handler) {
  return async function withSessionHandlerWrapper(req, res) {
    if (!req.session) {
      req.session = await getSession(req, res)
    }
    return await handler(req, res)
  }
}

export function withUser(handler) {
  return async function withUserHandlerWrapper(req, res) {
    if (!req.session) {
      req.session = await getSession(req, res)
    }
    if (!req.user) {
      req.user = null
      if (req.session.get('userId')) {
        req.user = await getUserById(req.session.get('userId'))
      }
    }
    return await handler(req, res)
  }
}
