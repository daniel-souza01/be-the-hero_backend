import { Prisma, Case } from '@prisma/client'
import { CasesRepository } from '../cases-repository'
import { randomUUID } from 'crypto'

export class InMemoryCasesRepository implements CasesRepository {
  public items: Case[] = []

  async findManyByUserId(userId: string) {
    const cases = this.items.filter((item) => item.user_id === userId)

    return cases
  }

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

  async delete(caseId: string) {
    const filteredItems = this.items.filter((item) => item.id !== caseId)

    this.items = filteredItems

    return this.items
  }
}
