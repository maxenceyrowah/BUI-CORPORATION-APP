import { Observable } from 'rxjs';

import { Task } from '@core/models';

export abstract class TaskGateway {
  abstract getTasks(): Observable<Task[]>;
  abstract postTask(data: Task): Promise<any>;
  abstract putTask(data: Partial<Task>, documentId: string): Promise<any>;
  abstract deleteTask(documentId: string): Promise<any>;
}
