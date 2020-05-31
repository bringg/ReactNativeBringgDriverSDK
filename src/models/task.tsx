import { TaskInventory } from './task_inventory';
import { TaskNote, taskNoteFromJSONObject } from './task_note';
import { parseISODateString } from '../utils/parseISODate';
import { Waypoint, waypointFromJSONObject } from './waypoint';

export enum TaskStatus {
  free = 0,
  assigned = 1,
  onTheWay = 2,
  checkedIn = 3,
  checkedOut = 4,
  accepted = 6,
  cancelled = 7,
}

export type Task = {
  // Ids
  id: number;
  external_id: string | null;
  user_id: number | null;
  linked_task_id: number | null;

  // State and details
  status: TaskStatus;
  title: string | null;
  priority: number | null;
  asap?: boolean;
  started_time: Date | null;
  scheduled_at: Date | null;
  active_way_point_id: number | null;
  extras: { [key: string]: any };

  // Configurations Ids
  task_configuration_id: number | null;
  tag_id: number | null;
  task_type_id: number | null;

  // Group task
  group_uuid: string | null;
  group_leader_id: number | null;

  // Relationships
  way_points: Waypoint[];
  task_inventories: TaskInventory[] | null;
  action_data: { [key: string]: any };
  task_notes: TaskNote[] | null;
};

export function taskFromJSONString(jsonString: string | null): Task | null {
  if (!jsonString) {
    return null;
  }
  return taskFromJSONObject(JSON.parse(jsonString));
}

export function taskFromJSONObject(jsonObject: { [key: string]: any }): Task {
  const dateKeys = ['started_time', 'scheduled_at'];
  const task: { [key: string]: any } = {
    ...jsonObject,
    way_points: jsonObject.way_points.map(
      (waypointJSONObject: { [key: string]: any }) =>
        waypointFromJSONObject(waypointJSONObject)
    ),
    task_notes: jsonObject.task_notes.map(
      (taskNoteJSONObject: { [key: string]: any }) =>
        taskNoteFromJSONObject(taskNoteJSONObject)
    ),
  };
  dateKeys.forEach((key) => {
    task[key] = parseISODateString(task[key]);
  });
  return task as Task;
}
