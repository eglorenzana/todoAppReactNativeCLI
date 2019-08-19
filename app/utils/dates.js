// we could avoid the dates parsing, if we trust in the data source.
export function parseDate(...date) {
  return new Date(...date);
}

export function isDateInRange(dateValue, startDate, endDate) {
    if (!dateValue) return true;
    const date = dateValue.getTime();
    const start = (startDate && startDate.getTime()) || 0;
    const end = (endDate && endDate.getTime()) || Infinity;
    return (start <= date && date <= end);
}

export function filterByDateRange(list, startDate, endDate) {
  return list.filter((item) => {
    return isDateInRange(item.date, startDate, endDate);
  })
}

export function dateString(date){
  return d.toLocaleDateString();
}

export function timeString(date) {
  return d.toLocaleTimeString();
}

function dateTimeRange(date) {
  const startDate = new Date(date);
  const endDate = new Date(date);
  startDate.setHours(0,0,0);
  endDate.setHours(23,59,59);
  return { startDate, endDate, dateBase: date };
}

export function dayTimeRange(date, dayOffset = 0) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + dayOffset);
  return dateTimeRange(nextDate);
}
