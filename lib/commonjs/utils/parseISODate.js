"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseISODateString = parseISODateString;

function parseISODateString(dateString) {
  if (!dateString || typeof dateString !== 'string') {
    return null;
  }

  return new Date(dateString);
}
//# sourceMappingURL=parseISODate.js.map