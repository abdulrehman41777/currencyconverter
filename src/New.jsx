import  { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(0);
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    axios.get(`https://freecurrencyapi.net/api/v2/currencies?apikey=4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2`)
      .then(res => {
        const currencyList = Object.keys(res.data).sort();
        setCurrencies(currencyList);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios.get(`https://freecurrencyapi.net/api/v2/rates/latest/${fromCurrency}/${toCurrency}?apikey=4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2`)
      .then(res => {
        const rate = res.data.rate;
        setExchangeRate(rate);
      })
      .catch(err => console.log(err));
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    setConvertedAmount(amount * exchangeRate);
  }, [amount, exchangeRate]);

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  }

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  }

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  }

  return (
    <div>
      <h1>Currency Converter</h1>
      <div>
        <label>From:</label>
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <br/>
      <div>
        <label>To:</label>
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={handleAmountChange} />
      </div>
      <div>
        <p>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
      </div>
    </div>
  );
}

export default CurrencyConverter;