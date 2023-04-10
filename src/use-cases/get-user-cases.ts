import { CasesRepository } from '@/repositories/cases-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Case } from '@prisma/client'
import { UserDoesNotExistError } from './errors/user-does-not-exist-error'

interface GetUserCasesUseCaseRequest {
  userId: string
}

interface GetUserCasesUseCaseResponse {
  cases: Case[]
}

export class GetUserCasesUseCase {
  constructor(
    private casesRepository: CasesRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
  }: GetUserCasesUseCaseRequest): Promise<GetUserCasesUseCaseResponse> {
    const userExist = await this.usersRepository.findById(userId)

    if (!userExist) {
      throw new UserDoesNotExistError()
    }

    const cases = await this.casesRepository.findManyByUserId(userId)

    return {
      cases,
    }
  }
}
