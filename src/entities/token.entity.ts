import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { CustomEntity } from './custom.entity';
import { User } from './index';

@Entity()
export default class Token extends CustomEntity {
  @Column()
  token: string;

  @Column()
  expiresIn: string;

  @Column()
  type: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
