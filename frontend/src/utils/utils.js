import { compareAsc, format as formatDateFns, parseISO } from "date-fns";

export const formatDate = (date, dateFormat) => {
  if (!date) return "";
  const parsedDate = parseISO(date);
  return formatDateFns(parsedDate, dateFormat);
};
