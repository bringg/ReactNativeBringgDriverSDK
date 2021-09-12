"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.taskFromJSONString = taskFromJSONString;
exports.taskFromJSONObject = taskFromJSONObject;
exports.TaskStatus = void 0;

var _task_note = require("./task_note");

var _parseISODate = require("../utils/parseISODate");

var _waypoint = require("./waypoint");

let TaskStatus;
exports.TaskStatus = TaskStatus;

(function (TaskStatus) {
  TaskStatus[TaskStatus["free"] = 0] = "free";
  TaskStatus[TaskStatus["assigned"] = 1] = "assigned";
  TaskStatus[TaskStatus["onTheWay"] = 2] = "onTheWay";
  TaskStatus[TaskStatus["checkedIn"] = 3] = "checkedIn";
  TaskStatus[TaskStatus["checkedOut"] = 4] = "checkedOut";
  TaskStatus[TaskStatus["accepted"] = 6] = "accepted";
  TaskStatus[TaskStatus["cancelled"] = 7] = "cancelled";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));

function taskFromJSONString(jsonString) {
  if (!jsonString) {
    return null;
  }

  return taskFromJSONObject(JSON.parse(jsonString));
}

function taskFromJSONObject(jsonObject) {
  const dateKeys = ['started_time', 'scheduled_at'];
  const task = { ...jsonObject,
    way_points: jsonObject.way_points.map(waypointJSONObject => (0, _waypoint.waypointFromJSONObject)(waypointJSONObject)),
    task_notes: jsonObject.task_notes.map(taskNoteJSONObject => (0, _task_note.taskNoteFromJSONObject)(taskNoteJSONObject))
  };
  dateKeys.forEach(key => {
    task[key] = (0, _parseISODate.parseISODateString)(task[key]);
  });
  return task;
}
//# sourceMappingURL=task.js.map