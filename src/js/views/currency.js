class CurrencyUI {
  constructor() {
    this.currency = document.getElementById("currency_select");
  }

  get currencyValue() {
    return this.currency.value;
  }
}

const currencyUI = new CurrencyUI();
export default currencyUI;
