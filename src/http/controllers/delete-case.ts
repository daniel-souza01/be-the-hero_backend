import { makeDeleteCaseUseCase } from '@/use-cases/factories/make-delete-case-use-case'
import { Prisma } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteCase(request: FastifyRequest, reply: FastifyReply) {
  const deleteCaseBodySchema = z.object({
    caseId: z.string(),
  })

  const { caseId } = deleteCaseBodySchema.parse(request.params)

  try {
    const deleteCaseUseCase = makeDeleteCaseUseCase()

    await deleteCaseUseCase.execute({
      caseId,
    })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
