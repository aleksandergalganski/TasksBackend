import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './Task';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(type => Task, task => task.category)
  tasks: Task[];

  @Column({ type: 'timestamp', select: false, default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;
}
