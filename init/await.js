const axios = require('axios');

module.exports = function() {
  const getExchangeRate = async (from, to) => {
    //   return axios
    //     .get(
    //       'http://data.fixer.io/api/latest?access_key=08aff59d47c3f2ff744e63ab84052bc4'
    //     )
    //     .then(res => {
    //       return res.data.rates[to] / res.data.rates[from];
    //     })
    //     .catch(e => console.log(e));
    // };

    try {
      const res = await axios.get(
        'http://data.fixer.io/api/latest?access_key=08aff59d47c3f2ff744e63ab84052bc4'
      );
      const rate = res.data.rates[to] / res.data.rates[from];
      if (!rate) {
        throw new Error();
      }
      return rate;
    } catch (e) {
      throw new Error(`Unable to get exchange rate from ${from} to ${to}!!!`);
    }
  };

  const getCountries = async currencyCode => {
      try {
          const res = await axios.get(
      `http://restcountries.eu/rest/v2/currency/${currencyCode}`
    );
    return res.data.map(country => country.name);
      } catch (e) {
          throw new Error(`Unable to get countries that use ${currencyCode}.`)
      }
    
  };

  const converCurrency = async (from, to, amount) => {
    const rate = await getExchangeRate(from, to);
    const convertedAmount = (amount * rate).toFixed(2);
    const country = await getCountries(to);
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${country}`;
  };

  converCurrency('USD', 'USD', 4000)
    .then(result => {
      console.log(result);
    })
    .catch(e => {
      console.log(e.message);
    });
};
