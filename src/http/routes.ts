import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { caseController } from './controllers/case'
import { getCases } from './controllers/get-cases'
import { deleteCase } from './controllers/delete-case'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate)

  app.post('/cases', caseController)
  app.get('/cases/:userId', getCases)
  app.delete('/cases/:caseId', deleteCase)
}
