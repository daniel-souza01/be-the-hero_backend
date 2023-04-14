import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Case (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a case', async () => {
    const { token, user } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/cases')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'new case',
        description: 'case description',
        value: 500,
        user_id: user.id,
      })

    expect(response.status).toEqual(201)
  })
})
