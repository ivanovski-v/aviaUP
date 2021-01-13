import api from "../services/apiService.js";
import config from "../config/apiConfig.js";
import { formatDate } from "../helpers/date.js";

class Locations {
  constructor(api, helpers) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.citiesListAutocomplete = null;
    this.airlines = null;
    this.lastSearchData = null;
    this.formatDate = helpers.formatDate;
  }

  async initialize() {
    const response = await Promise.all([
      this.api.getCountries(),
      this.api.getCities(),
      this.api.getAirlines(),
    ]);

    const [countries, cities, airlines] = response;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCities(cities);
    this.citiesListAutocomplete = this.createCitiesListAutocomplete();
    this.airlines = this.serializeAirlines(airlines);
  }

  getCityCodeByCityName(cityName) {
    return Object.keys(this.cities).find(
      (city) => this.cities[city].fullCityData === cityName
    );
  }

  getCityNameByCityCode(cityCode) {
    return this.cities[cityCode].name;
  }

  getAirlineNameByAirlineCode(code) {
    return this.airlines[code].name ? this.airlines[code].name : "";
  }

  getAirlineLogoByAirlineCode(code) {
    return this.airlines[code].logo ? this.airlines[code].logo : "";
  }

  //* Load tickets by user's input
  async loadTickets(params) {
    const response = await this.api.getPrices(params);
    this.lastSearchData = this.createTicketsList(response.data);
  }

  //* Creating list of cities to be suitable for autocomplete
  createCitiesListAutocomplete() {
    if (this.cities) {
      return Object.values(this.cities).reduce((acc, city) => {
        acc[city.fullCityData] = null;
        return acc;
      }, {});
    }
    return null;
  }

  //* Serializing countries to suitable format: [{}, {}, ...] -> {{}, {}, ...}
  serializeCountries(countries) {
    return countries.reduce((acc, country) => {
      acc[country.code] = country;
      return acc;
    }, {});
  }

  //* Serializing cities to suitable format: [{}, {}, ...] -> {{}, {}, ...}
  serializeCities(cities) {
    return cities.reduce((acc, city) => {
      city.fullCityData = `${city.name_translations.en}, ${
        this.countries[city.country_code].name_translations.en
      }, ${city.code}`;
      city.name = city.name_translations.en;
      acc[city.code] = city;
      return acc;
    }, {});
  }

  //* Serializing airlines to suitable format: [{}, {}, ...] -> {{}, {}, ...}
  serializeAirlines(airlines) {
    return airlines.reduce((acc, airline) => {
      airline.logo = `${config.logo_url}/${airline.code}.png`;
      airline.name = airline.name_translations.en;
      acc[airline.code] = airline;
      return acc;
    }, {});
  }

  //* Creating airlines list to be suilable for UI format
  createTicketsList(tickets) {
    return Object.values(tickets).map((ticket) => {
      return {
        ...ticket,
        origin_name: this.getCityNameByCityCode(ticket.origin),
        destination_name: this.getCityNameByCityCode(ticket.destination),
        airline_logo: this.getAirlineLogoByAirlineCode(ticket.airline),
        airline_name: this.getAirlineNameByAirlineCode(ticket.airline),
        departure_at: this.formatDate(ticket.departure_at, "dd MMM yyyy hh:mm"),
        return_at: this.formatDate(ticket.return_at, "dd MMM yyyy hh:mm"),
      };
    });
  }
}

const locations = new Locations(api, { formatDate });
export default locations;
