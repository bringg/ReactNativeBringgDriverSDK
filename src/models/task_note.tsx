import { parseISODateString } from '../utils/parseISODate';

export enum TaskNoteType {
  note = 'TaskNote',
  signature = 'Signature',
  photo = 'TaskPhoto',
  html = 'HtmlTaskNote',
  form = 'Form',
  formattedTaskNote = 'FormattedTaskNote',
}

export type TaskNote = {
  // Ids
  id: number;
  way_point_id: number;
  task_inventory_id: number | null;
  form_group_uuid: string | null;

  // Note data
  note: string | { [key: string]: string } | null;
  type: TaskNoteType;

  // URLs
  medium_url: string | null;
  thumbnail_url: string | null;
  url: string | null;

  // Additional data
  created_at: Date;
  updated_at: Date | null;
};

export function taskNoteFromJSONObject(jsonObject: {
  [key: string]: any;
}): TaskNote {
  const dateKeys = ['created_at', 'updated_at'];
  const taskNote = { ...jsonObject };
  dateKeys.forEach((key) => {
    taskNote[key] = parseISODateString(taskNote[key]);
  });
  return taskNote as TaskNote;
}
