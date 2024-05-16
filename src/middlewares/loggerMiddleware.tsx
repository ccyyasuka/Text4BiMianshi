import { Middleware } from "redux"

export const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  console.log("dispatching", action)
  return next(action)
}
