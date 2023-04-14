import { UserDoesNotExistError } from '@/use-cases/errors/user-does-not-exist-error'
import { makeCreateCaseUseCase } from '@/use-cases/factories/make-create-case-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createCase(request: FastifyRequest, reply: FastifyReply) {
  const caseBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    value: z.number(),
    user_id: z.string(),
  })

  const { title, description, value, user_id } = caseBodySchema.parse(
    request.body
  )

  try {
    const createCaseUseCase = makeCreateCaseUseCase()

    await createCaseUseCase.execute({
      title,
      description,
      value,
      user_id,
    })
  } catch (err) {
    if (err instanceof UserDoesNotExistError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
