class TicketsUI {
  constructor() {
    this.container = document.querySelector(".tickets-section .row");
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
    this.container.insertAdjacentHTML(
      "afterbegin",
      TicketsUI.generateEmptyMsgTemplate()
    );
  }

  static generateEmptyMsgTemplate() {
    return `
    <div class="tickets-empty-results-msg">
      No any results found
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
