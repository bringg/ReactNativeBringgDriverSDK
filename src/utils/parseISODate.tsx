export function parseISODateString(dateString: any | null): Date | null {
  if (!dateString || typeof dateString !== 'string') {
    return null;
  }
  return new Date(dateString);
}
