import { CasesRepository } from '@/repositories/cases-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { Case } from '@prisma/client'
import { UserDoesNotExistError } from './errors/user-does-not-exist-error'

interface CreateCaseUseCaseRequest {
  title: string
  description: string
  value: number
  user_id: string
}

interface CreateCaseUseCaseResponse {
  case: Case
}

export class CreateCaseUseCase {
  constructor(
    private casesRepository: CasesRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    title,
    description,
    value,
    user_id,
  }: CreateCaseUseCaseRequest): Promise<CreateCaseUseCaseResponse> {
    const userExist = await this.usersRepository.findById(user_id)

    if (!userExist) {
      throw new UserDoesNotExistError()
    }

    const caseCreated = await this.casesRepository.create({
      title,
      description,
      value,
      user_id,
    })

    return {
      case: caseCreated,
    }
  }
}
