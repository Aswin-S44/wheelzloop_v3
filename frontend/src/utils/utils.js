import { compareAsc, format as formatDateFns, parseISO } from "date-fns";

export const formatDate = (date, dateFormat) => {
  if (!date) return "";
  const parsedDate = parseISO(date);
  return formatDateFns(parsedDate, dateFormat);
};

export const formatViews = (view) => {
  if (view > 999 && view < 99999) {
    return `${view} k`;
  } else if (view >= 100000 && view < 999999) {
    return `${view} Lakh`;
  } else if (view > 999999 && view < 9999999) {
    return `${view} M`;
  } else if (view > 10000000) {
    return `${view} Cr`;
  } else {
    return view;
  }
};
