import { Observable, of } from 'rxjs';

import { Task } from '@core/models';
import { TaskGateway } from '@core/ports';

export class InMemoryTaskGateway extends TaskGateway {
  tasks: Task[] = [];

  withTasks(tasks: Task[]): InMemoryTaskGateway {
    this.tasks = tasks;
    return this;
  }

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }
  async postTask(data: Task): Promise<any> {
    const newTask: Task = { ...data, _id: (this.tasks.length + 1).toString() };
    this.tasks.push(newTask);
    return Promise.resolve(newTask);
  }
  async putTask(data: Partial<Task>, documentId: string): Promise<any> {
    const taskIndex = this.tasks.findIndex((task) => task._id === documentId);

    if (taskIndex === -1) {
      return Promise.reject({ message: 'Task not found' });
    }

    const updatedTask = { ...this.tasks[taskIndex], ...data };
    this.tasks[taskIndex] = updatedTask;

    return Promise.resolve(updatedTask);
  }
  async deleteTask(documentId: string): Promise<any> {
    const taskIndex = this.tasks.findIndex((task) => task._id === documentId);

    if (taskIndex === -1) {
      return Promise.reject({ message: 'Task not found' });
    }

    this.tasks.splice(taskIndex, 1);
    return Promise.resolve({ message: 'Task deleted' });
  }
}
