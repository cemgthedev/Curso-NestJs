import { Priority } from 'modules/task/enum/priority.enum';
import { Status } from 'modules/task/enum/status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar' })
  title!: string;

  @Column({ type: 'varchar', length: 300 })
  description!: string;

  @Column({ type: 'enum', enum: Priority })
  priority!: string;

  @Column({ type: 'enum', enum: Status })
  status!: string;

  @Column({ type: 'timestamp', nullable: true })
  dueDate?: Date;
}
