import { IsPositive } from 'class-validator';
import { User } from 'entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  title!: string;

  @Column({ type: 'varchar', length: 300 })
  content!: string;

  @IsPositive()
  @Column({ type: 'int', nullable: false })
  fromId!: number;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  from?: User;

  @IsPositive()
  @Column({ type: 'int', nullable: false })
  toId!: number;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  to?: User;

  @CreateDateColumn()
  createdAt!: Date;

  @CreateDateColumn()
  updatedAt?: Date;
}
