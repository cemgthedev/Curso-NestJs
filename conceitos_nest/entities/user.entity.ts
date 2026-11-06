import { Message } from 'entities/message.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'varchar' })
  email!: string;

  @Column({ type: 'varchar', length: 20 })
  password!: string;

  @OneToMany(() => Message, (message) => message.from)
  sentMessages?: Message[];

  @OneToMany(() => Message, (message) => message.to)
  receivedMessages?: Message[];

  @CreateDateColumn()
  createdAt!: Date;

  @CreateDateColumn()
  updatedAt?: Date;
}
