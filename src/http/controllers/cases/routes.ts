import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { getCases } from './get-cases'
import { createCase } from './create-case'
import { deleteCase } from './delete-case'

export async function casesRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/cases/:userId', getCases)
  app.post('/cases', createCase)
  app.delete('/cases/:caseId', deleteCase)
}
