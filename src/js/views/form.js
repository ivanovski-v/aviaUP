import {
  getAutocompleteInstance,
  getDatepickerInstance,
} from "../plugins/materialize.js";

class FormUI {
  constructor(funcAutocomplete, funcDatepicker) {
    this._form = document.forms["locationForm"];
    this.from = document.getElementById("autocomplete-from");
    this.to = document.getElementById("autocomplete-to");
    this.departDate = document.getElementById("datepicker-depart");
    this.returnDate = document.getElementById("datepicker-return");

    this.fromAutocomplete = funcAutocomplete(this.from);
    this.toAutocomplete = funcAutocomplete(this.to);
    this.departDateDatepicker = funcDatepicker(this.departDate);
    this.returnDateDatepicker = funcDatepicker(this.returnDate);
  }

  get form() {
    return this._form;
  }

  get fromValue() {
    return this.from.value;
  }

  get toValue() {
    return this.to.value;
  }

  get departDateValue() {
    return this.departDateDatepicker.toString();
  }

  get returnDateValue() {
    return this.returnDateDatepicker.toString();
  }

  setAutocomplete(data) {
    this.fromAutocomplete.updateData(data);
    this.toAutocomplete.updateData(data);
  }
}

const formUI = new FormUI(getAutocompleteInstance, getDatepickerInstance);
export default formUI;
