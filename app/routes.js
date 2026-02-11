import express from 'express'

export const routes = express.Router()

routes.post('/', (req, res, next) => {
  // @ts-expect-error - Property 'data' does not exist
  const { data } = req.session

  if (typeof data?.features === 'string') {
    data.features = JSON.parse(data.features ?? [])
  }

  next()
})
