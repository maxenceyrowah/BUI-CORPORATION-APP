export const TASK_DOC_NAME = 'tasks';

export const STATUS = [
  { value: 'completed', label: 'Terminé' },
  { value: 'uncompleted', label: 'Non terminé' },
];

export const TASKS_OPTIONS = [
  {
    label: 'Tous',
    value: 'all',
  },
  ...STATUS,
];

export enum TASK_STATUT {
  'TOUS' = 'all',
  'TERMINE' = 'completed',
  'NON_TERMINE' = 'uncompleted',
}

export const TASKS_COLUMNS = ['task_name', 'statut', 'actions'];
