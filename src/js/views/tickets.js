import formUI from "./form.js";
import { extractCityFromFullLocation } from "../helpers/string.js";

class TicketsUI {
  constructor() {
    this.container = document.querySelector(".tickets-section .row");
    this.body = document.body;
  }

  renderTickets(tickets) {
    this.clearContainer();
    if (!tickets.length) {
      this.showEmptyMsg();
      return;
    }

    this.container.insertAdjacentHTML(
      "afterbegin",
      tickets.reduce((acc, ticket) => {
        acc += TicketsUI.generateTicketTemplate(ticket);
        return acc;
      }, "")
    );
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  showEmptyMsg() {
    document.body.insertAdjacentHTML(
      "beforeend",
      TicketsUI.generateEmptyMsgTemplate()
    );
  }

  static generateEmptyMsgTemplate() {
    return `
    <div class="row #880e4f pink darken-4 tickets-empty-results-msg m0 not-found-p20" style="text-align: center;">
      <span style="color:white;font-weight: bold;text-align:center;">
        Sorry, we couldn't found any tickets from ${extractCityFromFullLocation(
          formUI.fromValue
        )} to ${extractCityFromFullLocation(formUI.toValue)} for your dates.
      </span>
    </div>`;
  }

  static generateTicketTemplate(ticket) {
    return `
    <div class="col s10 m5">
      <div class="card">
        <div class="card-content">
          <img src="${ticket.airline_logo}" class="ticket-airline-img"/>
          <div class="d-flex align-items-center mr-auto">
            <span class="ticket-city">${ticket.origin_name}</span>
            <i class="tiny material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex">
            <i class="tiny material-icons">flight_land</i>
            <span class="ticket-city">${ticket.destination_name}</span>
          </div>
        </div>
        <div class="card-action">
          <div class="ticket-time-price d-flex align-items-center">
            <span class="ticket-time-departure">${ticket.departure_at}</span>
            <span class="ticket-price ml-auto">${ticket.price}</span>
          </div>
          <div class="ticket-additional-info">
            <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
            <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
          </div>
        </div>
      </div>
    </div>  
  `;
  }
}

const ticketUI = new TicketsUI();

export default ticketUI;
