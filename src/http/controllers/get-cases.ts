import { UserDoesNotExistError } from '@/use-cases/errors/user-does-not-exist-error'
import { makeGetUserCasesUseCase } from '@/use-cases/factories/make-get-user-cases-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getCases(request: FastifyRequest, reply: FastifyReply) {
  const getCasesBodySchema = z.object({
    userId: z.string(),
  })

  const { userId } = getCasesBodySchema.parse(request.params)

  try {
    const getUserCasesUseCase = makeGetUserCasesUseCase()

    const { cases } = await getUserCasesUseCase.execute({
      userId,
    })

    return reply.status(200).send(cases)
  } catch (err) {
    if (err instanceof UserDoesNotExistError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
