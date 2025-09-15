const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const shortMonthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function parseDate(dateString) {
  const [month, year] = dateString.split("/").map(Number);
  return { month, year };
}

export function formatDateRange(dates) {
  if (!dates || dates.length === 0) return "";

  if (dates.length === 1) {
    // Handle "current" as a special case
    if (dates[0].toLowerCase() === "current") {
      return "Current";
    }
    const { month, year } = parseDate(dates[0]);
    return `${monthNames[month - 1]} ${year}`;
  }

  if (dates.length === 2) {
    const start = parseDate(dates[0]);
    // Handle "current" as end date
    if (dates[1].toLowerCase() === "current") {
      return `${shortMonthNames[start.month - 1]} ${start.year} - Current`;
    }
    const end = parseDate(dates[1]);

    if (start.year === end.year) {
      return `${shortMonthNames[start.month - 1]} - ${
        shortMonthNames[end.month - 1]
      } ${end.year}`;
    } else {
      return `${shortMonthNames[start.month - 1]} ${start.year} - ${
        shortMonthNames[end.month - 1]
      } ${end.year}`;
    }
  }

  return "";
}
