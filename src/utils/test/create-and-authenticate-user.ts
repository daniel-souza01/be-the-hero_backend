import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  const user = await prisma.user.create({
    data: {
      name: 'ong-name',
      email: 'ongname@example.com',
      phone: '9999999',
      city: 'city',
      uf: 'uf',
      password_hash: await hash('123456', 6),
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: user.email,
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
    user,
  }
}
