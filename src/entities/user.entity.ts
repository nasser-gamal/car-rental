import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import { CustomEntity } from './custom.entity';
import { RoleEnum } from '../enums/role.enum';
import * as bcrypt from 'bcrypt';

console.log(RoleEnum.ADMIN);

@Entity()
class User extends CustomEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ select: false, nullable: true })
  passwordResetCode: string;

  @Column({ select: false, nullable: true })
  passwordResetExpires: Date;

  @Column({ select: false, nullable: true })
  passwordResetVerified: boolean;

  @Column({ nullable: true })
  passwordChangedAt: Date;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ select: false, nullable: true })
  emailVerifyCode: string;

  @Column({ select: false, nullable: true })
  emailCodeExpires: Date;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.USER })
  role: string;

  @Column()
  phone: string;

  @BeforeInsert()
  async beforeInsert() {
    this.userName = `${this.firstName} ${this.lastName}`;
    this.hashPassword();
  }

  @BeforeUpdate()
  async beforeUpdate() {
    if (this.firstName || this.lastName) {
      this.userName = `${this.firstName} ${this.lastName}`;
    }
    if (this.password) {
      this.hashPassword();
      this.passwordChangedAt = new Date();
    }
  }

  public hashPassword() {
    this.password = bcrypt.hashSync(this.password, 12);
  }

  public comparePassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}

export default User;
