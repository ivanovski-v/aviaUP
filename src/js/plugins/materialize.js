import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

/// Select initialization
M.FormSelect.init(document.querySelectorAll("select"));

/// Autocomplete initialization
M.Autocomplete.init(document.querySelectorAll(".autocomplete"));

/// Date Picker initialization
M.Datepicker.init(document.querySelectorAll(".datepicker"), {
  showClearBtn: true,
  format: "dd-mm-yyyy",
});

//! Exports
export function getSelectInstance(element) {
  return M.FormSelect.getInstance(element);
}
export function getAutocompleteInstance(element) {
  return M.Autocomplete.getInstance(element);
}
export function getDatepickerInstance(element) {
  return M.Datepicker.getInstance(element);
}
