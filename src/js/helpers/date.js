import { format } from "date-fns";

export function formatDate(str, type) {
  return format(new Date(str), type);
}
