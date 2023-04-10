import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { caseController } from './controllers/case'
import { getCases } from './controllers/get-cases'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  app.post('/cases', caseController)

  app.get('/cases/:userId', getCases)
}
