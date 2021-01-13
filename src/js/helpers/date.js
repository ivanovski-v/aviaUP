import { format } from "date-fns";

export function formatDate(str, type) {
  return format(new Date(str), type);
}

export function convertDateToServerFormat(str) {
  const dateArray = str.split("-");
  return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
}
