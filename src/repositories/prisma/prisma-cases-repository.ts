import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

import { CasesRepository } from '../cases-repository'

export class PrismaCasesRepository implements CasesRepository {
  async findManyByUserId(userId: string) {
    const cases = await prisma.case.findMany({
      where: {
        user_id: userId,
      },
    })

    return cases
  }

  async create(data: Prisma.CaseUncheckedCreateInput) {
    const caseCreated = await prisma.case.create({
      data,
    })

    return caseCreated
  }

  async delete(caseId: string) {
    await prisma.case.delete({
      where: {
        id: caseId,
      },
    })
  }
}
