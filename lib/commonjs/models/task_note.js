"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.taskNoteFromJSONObject = taskNoteFromJSONObject;
exports.TaskNoteType = void 0;

var _parseISODate = require("../utils/parseISODate");

let TaskNoteType;
exports.TaskNoteType = TaskNoteType;

(function (TaskNoteType) {
  TaskNoteType["note"] = "TaskNote";
  TaskNoteType["signature"] = "Signature";
  TaskNoteType["photo"] = "TaskPhoto";
  TaskNoteType["html"] = "HtmlTaskNote";
  TaskNoteType["form"] = "Form";
  TaskNoteType["formattedTaskNote"] = "FormattedTaskNote";
})(TaskNoteType || (exports.TaskNoteType = TaskNoteType = {}));

function taskNoteFromJSONObject(jsonObject) {
  const dateKeys = ['created_at', 'updated_at'];
  const taskNote = { ...jsonObject
  };
  dateKeys.forEach(key => {
    taskNote[key] = (0, _parseISODate.parseISODateString)(taskNote[key]);
  });
  return taskNote;
}
//# sourceMappingURL=task_note.js.map