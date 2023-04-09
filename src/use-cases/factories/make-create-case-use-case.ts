import { PrismaCasesRepository } from '@/repositories/prisma/prisma-cases-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateCaseUseCase } from '../create-case'

export function makeCreateCaseUseCase() {
  const casesRepository = new PrismaCasesRepository()
  const usersRepository = new PrismaUsersRepository()
  const createCaseUseCase = new CreateCaseUseCase(
    casesRepository,
    usersRepository
  )

  return createCaseUseCase
}
