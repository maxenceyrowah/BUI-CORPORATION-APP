export const TASK_COLLECTION_NAME = 'tasks';

export const TASK_STATUS_OPTIONS = [
  { value: 'completed', label: 'Terminé' },
  { value: 'uncompleted', label: 'Non terminé' },
];

export const TASKS_FILTER_OPTIONS = [
  {
    label: 'Tous',
    value: 'all',
  },
  ...TASK_STATUS_OPTIONS,
];

export enum TASK_STATUT {
  'TOUS' = 'all',
  'TERMINE' = 'completed',
  'NON_TERMINE' = 'uncompleted',
}

export const TASKS_COLUMNS = ['task_name', 'statut', 'actions'];
