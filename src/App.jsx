import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [allCurrencies, setAllCurrencies] = useState({});
  const [selectedCurr, setSelectedCurr] = useState("");
  const [currencyKeys, setCurrencyKeys] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState("");



  const getCurrency = async () => {
    try {
      const res = await axios.get(
        `https://api.freecurrencyapi.com/v1/latest?apikey=4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2`
      );

      const Keys = Object.keys(res.data.data);
      setCurrencyKeys(Keys);
      setAllCurrencies(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChange = (e) => {
    setSelectedCurr(e.target.value);

    // Convert the selected currency to PKR
    const exchangeRate = allCurrencies[e.target.value];
    const pkrAmount = 283.85 / exchangeRate;
    setConvertedAmount(pkrAmount.toFixed(2));
  };

  useEffect(() => {
    getCurrency();
  }, []);


  return (
    <>
      <div>
        <h2>Select Currency</h2>
        <select onChange={handleOnChange} name="selectedCurr">
          <option value="">Select Currency</option>
          {currencyKeys.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        {selectedCurr && (
          <p>
            {convertedAmount} PKR for 1 {selectedCurr}
          </p>
        )}
      </div>
    </>
  );
}

export default App;
