import { Prisma, Case } from '@prisma/client'
import { CasesRepository } from '../cases-repository'
import { randomUUID } from 'crypto'

export class InMemoryCasesRepository implements CasesRepository {
  public items: Case[] = []

  async create(data: Prisma.CaseUncheckedCreateInput) {
    const caseData = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      value: new Prisma.Decimal(Number(data.value)),
      created_at: new Date(),
      user_id: data.user_id,
    }

    this.items.push(caseData)

    return caseData
  }
}
