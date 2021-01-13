import axios from "axios";
import config from "../config/apiConfig.js";

/** //? API Server endpoints
 *  > /countries => Array[avail countries]
 *  > /cities => Array[avail cities]
 *  > /prices/cheap => Array[avail routes]
 */

class API {
  constructor(config) {
    this.url = config.url;
  }

  async getCountries() {
    try {
      const countries = await axios.get(`${this.url}/countries`);
      return countries.data;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  async getCities() {
    try {
      const cities = await axios.get(`${this.url}/cities`);
      return cities.data;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  async getPrices(params) {
    try {
      const prices = await axios.get(`${this.url}/prices/cheap`, { params });
      return prices.data;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  async getAirlines() {
    try {
      const airlines = await axios.get(`${this.url}/airlines`);
      return airlines.data;
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
}

const api = new API(config);
export default api;
