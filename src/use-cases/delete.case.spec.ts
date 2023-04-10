import { describe, it, expect } from 'vitest'
import { CasesRepository } from '@/repositories/cases-repository'
import { InMemoryCasesRepository } from '@/repositories/in-memory/in-memory-cases-repository'
import { randomUUID } from 'crypto'
import { DeleteCaseUseCase } from './delete-case'

let casesRepository: CasesRepository
let sut: DeleteCaseUseCase

describe('Delete Case Use Case', () => {
  it('should be able to delete a case', async () => {
    casesRepository = new InMemoryCasesRepository()
    sut = new DeleteCaseUseCase(casesRepository)

    const newCase = await casesRepository.create({
      title: 'new case',
      description: 'case description',
      value: 100,
      user_id: randomUUID(),
    })

    const cases = await sut.execute({
      caseId: newCase.id,
    })

    expect(cases).not.toContainEqual(newCase)
  })
})
