import { PrismaCasesRepository } from '@/repositories/prisma/prisma-cases-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserCasesUseCase } from '../get-user-cases'

export function makeGetUserCasesUseCase() {
  const casesRepository = new PrismaCasesRepository()
  const usersRepository = new PrismaUsersRepository()
  const getUserCasesUseCase = new GetUserCasesUseCase(
    casesRepository,
    usersRepository
  )

  return getUserCasesUseCase
}
