import { inject } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';

import { Task } from '@core/models';
import { TaskGateway } from '@core/ports';
import { TASK_DOC_NAME } from '@shared/constants/task';

export class FirebaseTaskGateway extends TaskGateway {
  private readonly fbStore = inject(Firestore);
  private tasksCollection = collection(this.fbStore, TASK_DOC_NAME);

  getTasks() {
    return collectionData(this.tasksCollection);
  }

  postTask(data: any) {
    const newCollection = doc(this.tasksCollection);
    return setDoc(newCollection, { ...data, _id: newCollection.id });
  }

  putTask(data: Partial<Task>, documentId: string) {
    const newCollection = doc(this.fbStore, `/${TASK_DOC_NAME}/${documentId}`);
    return updateDoc(newCollection, data as any);
  }

  deleteTask(documentId: string) {
    const newCollection = doc(this.fbStore, `/${TASK_DOC_NAME}/${documentId}`);
    return deleteDoc(newCollection);
  }
}
