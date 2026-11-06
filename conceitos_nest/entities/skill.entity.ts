import { Level } from 'modules/skills/enum/level.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  title!: string;

  @Column({ type: 'enum', enum: Level })
  level!: Level;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt?: Date;
}
