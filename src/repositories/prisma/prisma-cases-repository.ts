import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

import { CasesRepository } from '../cases-repository'

export class PrismaCasesRepository implements CasesRepository {
  async create(data: Prisma.CaseUncheckedCreateInput) {
    const caseCreated = await prisma.case.create({
      data,
    })

    return caseCreated
  }
}
