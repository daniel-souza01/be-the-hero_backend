import { PrismaCasesRepository } from '@/repositories/prisma/prisma-cases-repository'
import { DeleteCaseUseCase } from '../delete-case'

export function makeDeleteCaseUseCase() {
  const casesRepository = new PrismaCasesRepository()
  const deleteCaseUseCase = new DeleteCaseUseCase(casesRepository)

  return deleteCaseUseCase
}
