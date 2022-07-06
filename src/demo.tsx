import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Converter from "./components/Converter";
import Chart from "./components/Chart";
import { FormatDate, FetchConfig, SetItem, GetItem } from "./shared/utility";
import constants from "./shared/constants";

export default function BasicSelect() {
  const [historyRates, setHistoryRates] = useState<{ [key: string]: {} }[]>([]);
  const [updateHistory, setUpdateHistory] = useState(false);
  const [currencyList, setCurrencyList] = useState<{ [key: string]: string }[]>([]);
  const requestOptions = FetchConfig();

  const fetchHistoricalRates = () => {
    const historyList = GetItem(constants.LS_HISTORY);
    console.log('historyList', historyList)
    if (historyList && !updateHistory) {
      console.log("accessing localstorage");
      setHistoryRates(historyList);
      console.log("LS: new history set", historyList);
    } else {
      console.log("we're fetching new history..");

      const dateNow = new Date();
      const pastDays = 14;
      const end_date = FormatDate(dateNow, "-");
      const start_date = FormatDate(
        new Date(dateNow.setDate(dateNow.getDate() - pastDays)),
        "-"
      );
      console.log("dates", start_date, end_date);
      console.log(
        "link",
        `https://api.apilayer.com/currency_data/timeframe?start_date=${start_date}&end_date=${end_date}&source=EUR`
      );

      fetch(
        `https://api.apilayer.com/currency_data/timeframe?start_date=2022-05-17&end_date=2022-05-31&source=EUR`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setHistoryRates(result.quotes);
          SetItem(constants.LS_HISTORY, result.quotes);
        })
        .catch((error) => console.log("error", error));

      setUpdateHistory(false);
    }
  };

  const fetchCurrencies = () => {
    const currenciesList = GetItem(constants.LS_CURRENCIES);

    if (currenciesList && !updateHistory) {
      console.log("accessing localstorage");
      setCurrencyList(currenciesList);
      console.log("LS: new currency set", currenciesList);
    } else {
      console.log("we're fetching new currencies..");

      fetch("https://api.apilayer.com/currency_data/list", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setCurrencyList(result.currencies);
          SetItem(constants.LS_CURRENCIES, result.currencies);
        })
        .catch((error) => console.log("error", error));
      console.log("API: new currency set", currenciesList);

      setUpdateHistory(false);
    }
  };

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    // Run API Call
    console.log("run api");
    fetchCurrencies();
    fetchHistoricalRates();
  }, [updateHistory]);
  
  return (
    <Box sx={{ minWidth: 120 }}>
      <Converter />
      <Chart
        updateHistory={updateHistory}
        updateStatus={setUpdateHistory}
        currencies={currencyList}
        history={historyRates}
      />
    </Box>
  );
}
