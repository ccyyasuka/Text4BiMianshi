import { Middleware } from "redux"

export const ErrorMiddleware: Middleware = (store) => (next) => (action) => {
  try {
    return next(action)
  } catch (error) {
    console.log("catch an error", error)
    throw error
  }
}
