import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'ong-name',
    email: 'ongname@example.com',
    phone: '9999999',
    city: 'city',
    uf: 'uf',
    password: '123456',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'ongname@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
