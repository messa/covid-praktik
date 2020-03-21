import { getSession } from './model/sessions'

export function withSession(handler) {
  return async function withSessionHandlerWrapper(req, res) {
    if (req.session) {
      throw new Error('req.session is already set')
    }
    req.session = await getSession(req, res)
    return await handler(req, res)
  }
}
