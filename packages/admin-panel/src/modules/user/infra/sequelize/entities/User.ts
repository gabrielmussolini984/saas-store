import {
  Table,
  Column,
  Model,
  UpdatedAt,
  CreatedAt,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  IsUUID,
  DataType,
  Default
} from 'sequelize-typescript';
import { Tenant } from '../../../../tenant/infra/sequelize/entities/Tenant';

@Table
export class User extends Model<User> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  id: string;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  // @Column
  // password_hash: string;

  @ForeignKey(() => Tenant)
  @Column
  tenant_id: string;

  @Column
  is_staff: boolean;

  @CreatedAt
  public readonly created_at: Date;

  @UpdatedAt
  public readonly updated_at: Date;

  @BelongsTo(() => Tenant)
  tenant: Tenant;

  // @BeforeSave
  // static async async(user: User) {
  //   const hashProvider: IHashProvider = new BcryptHashProvider();
  //   if (user.password) {
  //     // eslint-disable-next-line
  //     user.password_hash = await hashProvider.generate(user.password);
  //   }
  // }
}
