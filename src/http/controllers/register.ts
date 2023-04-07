import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterUseCase } from '@/use-cases/register'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    city: z.string(),
    uf: z.string(),
    password: z.string().min(6),
  })

  const { name, email, phone, city, uf, password } = registerBodySchema.parse(
    request.body
  )

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({
      name,
      email,
      phone,
      city,
      uf,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
