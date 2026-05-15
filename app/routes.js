import express from 'express'

export const routes = express.Router()

routes.post('/', (req, res, next) => {
  const { data } = req.session

  if (typeof data?.features === 'string') {
    data.features = JSON.parse(data.features ?? [])
  }

  next()
})
