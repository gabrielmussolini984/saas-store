import { FakeUserRepository } from '../repositories/fakes/FakeUserRepository';
import { FakeValidateUserProvider } from '../providers/ValidateUserProvider/fakes/FakeValidateUserProvider';
import { FakeHashProvider } from '../providers/HashProvider/fakes/FakeHashProvider';
import { CreateUserService } from './CreateUserService';
import { AuthenticateUserService } from './AuthenticateUserService';
import { AppError } from '../../../shared/errors/MainError';

jest.mock('../infra/sequelize/entities/User.ts');

describe('Authenticate User', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeValidateUserProvider = new FakeValidateUserProvider();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeValidateUserProvider
    );
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      tenant_id: '1'
    });

    const response = await authenticateUserService.execute({
      email: 'johndoe@example.com',
      password: '123456',
      tenant_id: '1'
    });
    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('name', 'John Doe');
    expect(response).toHaveProperty('email', 'johndoe@example.com');
    expect(response).toHaveProperty('password', '123456');
    expect(response).toHaveProperty('tenant_id', '1');
  });

  it('should not be able to authenticate with wrong email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    await expect(
      authenticateUserService.execute({
        email: 'johndoe@example.com',
        password: '123456',
        tenant_id: '1'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const fakeValidateUserProvider = new FakeValidateUserProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeValidateUserProvider
    );
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      tenant_id: '1'
    });

    await expect(
      authenticateUserService.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
        tenant_id: '1'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
