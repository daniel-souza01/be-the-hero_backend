import { CasesRepository } from '@/repositories/cases-repository'
import { Case } from '@prisma/client'

interface DeleteCaseUseCaseRequest {
  caseId: string
}

export class DeleteCaseUseCase {
  constructor(private casesRepository: CasesRepository) {}

  async execute({ caseId }: DeleteCaseUseCaseRequest): Promise<Case[] | void> {
    return await this.casesRepository.delete(caseId)
  }
}
