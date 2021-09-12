import { parseISODateString } from '../utils/parseISODate';
export let TaskNoteType;

(function (TaskNoteType) {
  TaskNoteType["note"] = "TaskNote";
  TaskNoteType["signature"] = "Signature";
  TaskNoteType["photo"] = "TaskPhoto";
  TaskNoteType["html"] = "HtmlTaskNote";
  TaskNoteType["form"] = "Form";
  TaskNoteType["formattedTaskNote"] = "FormattedTaskNote";
})(TaskNoteType || (TaskNoteType = {}));

export function taskNoteFromJSONObject(jsonObject) {
  const dateKeys = ['created_at', 'updated_at'];
  const taskNote = { ...jsonObject
  };
  dateKeys.forEach(key => {
    taskNote[key] = parseISODateString(taskNote[key]);
  });
  return taskNote;
}
//# sourceMappingURL=task_note.js.map