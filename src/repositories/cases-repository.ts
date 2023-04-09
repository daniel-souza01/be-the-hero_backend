import { Case, Prisma } from '@prisma/client'

export interface CasesRepository {
  create(data: Prisma.CaseUncheckedCreateInput): Promise<Case>
}
