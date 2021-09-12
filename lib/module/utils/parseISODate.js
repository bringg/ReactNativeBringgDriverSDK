export function parseISODateString(dateString) {
  if (!dateString || typeof dateString !== 'string') {
    return null;
  }

  return new Date(dateString);
}
//# sourceMappingURL=parseISODate.js.map