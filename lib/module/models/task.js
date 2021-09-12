import { taskNoteFromJSONObject } from './task_note';
import { parseISODateString } from '../utils/parseISODate';
import { waypointFromJSONObject } from './waypoint';
export let TaskStatus;

(function (TaskStatus) {
  TaskStatus[TaskStatus["free"] = 0] = "free";
  TaskStatus[TaskStatus["assigned"] = 1] = "assigned";
  TaskStatus[TaskStatus["onTheWay"] = 2] = "onTheWay";
  TaskStatus[TaskStatus["checkedIn"] = 3] = "checkedIn";
  TaskStatus[TaskStatus["checkedOut"] = 4] = "checkedOut";
  TaskStatus[TaskStatus["accepted"] = 6] = "accepted";
  TaskStatus[TaskStatus["cancelled"] = 7] = "cancelled";
})(TaskStatus || (TaskStatus = {}));

export function taskFromJSONString(jsonString) {
  if (!jsonString) {
    return null;
  }

  return taskFromJSONObject(JSON.parse(jsonString));
}
export function taskFromJSONObject(jsonObject) {
  const dateKeys = ['started_time', 'scheduled_at'];
  const task = { ...jsonObject,
    way_points: jsonObject.way_points.map(waypointJSONObject => waypointFromJSONObject(waypointJSONObject)),
    task_notes: jsonObject.task_notes.map(taskNoteJSONObject => taskNoteFromJSONObject(taskNoteJSONObject))
  };
  dateKeys.forEach(key => {
    task[key] = parseISODateString(task[key]);
  });
  return task;
}
//# sourceMappingURL=task.js.map