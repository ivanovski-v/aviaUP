import "./plugins";
import "../css/style.css";
import locations from ".//data/locations.js";
import formUI from "./views/form.js";
import currencyUI from "./views/currency.js";
import ticketUI from "./views/tickets.js";
import { convertDateToServerFormat } from "./helpers/date.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeApp();

  //! Application initialization
  async function initializeApp() {
    await locations.initialize();
    formUI.setAutocomplete(locations.citiesListAutocomplete);
  }

  //! Events
  formUI.form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  //! Handlers
  async function onFormSubmit() {
    //* Collect all the user's input data from the form
    const origin = locations.getCityCodeByCityName(formUI.fromValue);
    const destination = locations.getCityCodeByCityName(formUI.toValue);
    const depart_date = convertDateToServerFormat(formUI.departDateValue);
    const return_date = convertDateToServerFormat(formUI.returnDateValue);
    const currency = currencyUI.currencyValue;

    //* Initiate tickets search
    await locations.loadTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    //* Render tickets
    ticketUI.renderTickets(locations.lastSearchData);
  }
});


// TODO: Currency symbol
// TODO: Cards design
// TODO: Arrival time
// TODO: Favourites tickets
// TODO: Night theme
