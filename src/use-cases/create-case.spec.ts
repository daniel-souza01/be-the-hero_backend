import { describe, it, beforeEach, expect } from 'vitest'
import { CreateCaseUseCase } from './create-case'
import { InMemoryCasesRepository } from '@/repositories/in-memory/in-memory-cases-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserDoesNotExistError } from './errors/user-does-not-exist-error'

let casesRepository: InMemoryCasesRepository
let usersRepository: InMemoryUsersRepository
let sut: CreateCaseUseCase

describe('Create Case Use Case', () => {
  beforeEach(() => {
    casesRepository = new InMemoryCasesRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateCaseUseCase(casesRepository, usersRepository)
  })

  it('should be able to create a case', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123456',
      city: 'fake-city',
      uf: 'fake-uf',
      phone: '99999999',
    })

    const { case: newCase } = await sut.execute({
      title: 'new case',
      description: 'case description',
      value: 100,
      user_id: user.id,
    })

    expect(newCase.id).toEqual(expect.any(String))
  })

  it('should not be able to create a case with not existing user', async () => {
    await expect(() =>
      sut.execute({
        title: 'new case',
        description: 'case description',
        value: 100,
        user_id: '32',
      })
    ).rejects.toBeInstanceOf(UserDoesNotExistError)
  })
})
