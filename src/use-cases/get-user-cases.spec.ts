import { describe, it, expect, beforeEach } from 'vitest'
import { GetUserCasesUseCase } from './get-user-cases'
import { CasesRepository } from '@/repositories/cases-repository'
import { InMemoryCasesRepository } from '@/repositories/in-memory/in-memory-cases-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { randomUUID } from 'crypto'
import { UserDoesNotExistError } from './errors/user-does-not-exist-error'

let casesRepository: CasesRepository
let usersRepository: UsersRepository
let sut: GetUserCasesUseCase

describe('Get User Cases Use Case', () => {
  beforeEach(() => {
    casesRepository = new InMemoryCasesRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserCasesUseCase(casesRepository, usersRepository)
  })

  it('should be able to get user cases', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
      city: 'fake-city',
      uf: 'fake-uf',
      phone: '99999999',
    })

    const newCase = await casesRepository.create({
      title: 'new case',
      description: 'case description',
      value: 100,
      user_id: user.id,
    })

    const { cases } = await sut.execute({
      userId: user.id,
    })

    expect(cases).toContainEqual(newCase)
  })

  it('should not be able to get cases with non existing user', async () => {
    await expect(() =>
      sut.execute({
        userId: randomUUID(),
      })
    ).rejects.toBeInstanceOf(UserDoesNotExistError)
  })
})
