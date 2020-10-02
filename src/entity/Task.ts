import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

enum TaskType {
  TODO = 'todo',
  RUNNING = 'running',
  FINISHED = 'finished'
}

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'enum', enum: TaskType })
  type: TaskType;

  @ManyToOne(type => User, user => user.tasks)
  user: User;
}
