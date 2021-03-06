import { container } from 'tsyringe';

import { ICategoryRepository } from '@modules/category/repositories/ICategoryRepository';
import { CategoryRepository } from '@modules/category/infra/sequelize/repositories/CategoryRepository';

import { ICustomerRepository } from '@modules/customer/repositories/ICustomerRepository';
import { CustomerRepository } from '@modules/customer/infra/sequelize/repositories/CustomerRepository';

import { ICheckoutRepository } from '@modules/checkout/repositories/ICheckoutRepository';
import { CheckoutRepository } from '@modules/checkout/infra/sequelize/repositories/CheckoutRepository';

import { IPlanRepository } from '@modules/plan/repositories/IPlanRepository';
import { PlanRepository } from '@modules/plan/infra/sequelize/repositories/PlanRepository';

import { ITenantRepository } from '@modules/tenant/repositories/ITenantRepository';
import { TenantRepository } from '@modules/tenant/infra/sequelize/repositories/TenantRepository';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { UserRepository } from '@modules/user/infra/sequelize/repositories/UserRepository';

import '@modules/user/providers/HashProvider';
import '@modules/user/providers/ValidateUserProvider';
import '@modules/category/providers/ValidateCategoryProvider';
import '@modules/checkout/providers/CheckoutValidateProvider';
import '@modules/subscription/providers/SubscriptionValidateProvider';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository
);

container.registerSingleton<ICustomerRepository>(
  'CustomerRepository',
  CustomerRepository
);

container.registerSingleton<ICheckoutRepository>(
  'CheckoutRepository',
  CheckoutRepository
);

container.registerSingleton<IPlanRepository>('PlanRepository', PlanRepository);
container.registerSingleton<ITenantRepository>(
  'TenantRepository',
  TenantRepository
);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
