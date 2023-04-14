import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Get Cases (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user cases', async () => {
    const { token, user } = await createAndAuthenticateUser(app)

    const caseCreated = await prisma.case.create({
      data: {
        title: 'new case',
        description: 'case description',
        value: 500,
        user_id: user.id,
      },
    })

    const response = await request(app.server)
      .get(`/cases/${user.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body).toEqual([
      expect.objectContaining(JSON.parse(JSON.stringify(caseCreated))),
    ])
  })
})
