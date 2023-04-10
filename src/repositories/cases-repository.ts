import { Case, Prisma } from '@prisma/client'

export interface CasesRepository {
  findManyByUserId(userId: string): Promise<Case[]>
  create(data: Prisma.CaseUncheckedCreateInput): Promise<Case>
  delete(caseId: string): Promise<Case[] | void>
}
